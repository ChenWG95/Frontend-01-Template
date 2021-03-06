const net = require('net')
const parser = require('./parse')

class Request {
  // method get/post/options
  // url host+port+path
  // body k/v
  // headers content-type  content-length 必有
  constructor (options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.path = options.path || '/'
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }
  
  toString () {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
  }

  send (connection) {
    return new Promise((resolve, reject) => {
      let parser = new ResponseParser()

      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }

      connection.on('data', (data) => {
        parser.receive(data.toString())
        // resolve(data.toString())
        if (parser.isFinished) {
          resolve(parser.response())
        }
        connection.end()
      })

      connection.on('error', (err) => {
        reject(err.toString())
        connection.end()
      })
    })
  }
}

// status line
// header
// body
// 问题1: 如何判断完成结束（可能存在分批触发data事件传输）
class Response {

}

// 负责产生Response
// 收集满返回给Response
class ResponseParser {
  constructor () {
    // 定义状态机状态
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1 // \r\n
    this.WAITING_HEADER_NAME = 2  // header name
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4 // :value
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6 // 部分存在两个空行
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ""
    this.headers = {}
    this.headerName = ""
    this.headerValue = ""
    this.bodyParser = null
  }

  get isFinished () {
    return this.bodyParser && this.bodyParser.isFinished
  }

  response () {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  // 字符流处理 *buffer | string
  receive (string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar (char) {
    // 每个状态机判断需要是else if，否则会导致上面状态机判断修改状态后直接进入下一状态逻辑

    // statusLine
    // 读取字符，如果不是 \r 或者 \n 则追加至statusLine中
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } 
    // headers
    else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser()
        }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    }
    // body
    else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}

/**
 * "2" 长度
  "\r"
  "\n"
  "o" 内容
  "k"
  "\r"
  "\n"
  "0" 结束
  "\r"
  "\n"
  "\r"
  "\n"
 * 0结尾，忽略回车\r\n
 */
class TrunkedBodyParser {
  constructor () {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }

  receiveChar (char) {
    // console.log(JSON.stringify(char))
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 16
        this.length += parseInt(char, 16)
      }
    }
    else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    }
    else if (this.current === this.READING_TRUNK) {
      // FINISH: 补全逻辑
      if (char !== '\n' && char !== '\r') {
        this.content.push(char)
      }
      this.length --
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    }
    else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    }
    else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }
  }
}

void async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    path: '/',
    port: 8088,
    body: {
      name: 'cwg'
    },
    headers: {
      ['X-Foo2']: 'custom'
    }
  })

  let response = await request.send()
  let dom = parser.parseHTML(response.body)
}()
