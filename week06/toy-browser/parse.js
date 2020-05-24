// 参考：https://html.spec.whatwg.org/multipage/#toc-syntax Tokenization
const { rules, addCssRules } = require('./css-rules.js')

let currentToken = null
let currentAttribute = null

let stack = [{type: 'document', children: []}]

let currentTextNode = null

function compare (sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }

  return sp1[3] - sp2[3]
}

function specificity (selector) {
  const p = [0, 0, 0, 0]
  const selectorParts = selector.split(' ')
  for (let part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function match (element, selector) {
  if (!selector || !element.attributes) {
    return false
  }

  // id选择器
  if (selector.charAt(0) === '#') {
    // 寻找元素的id属性
    const attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) {
      return true
    }
  } 
  // 类选择器
  else if (selector.charAt(0) === '.') {
    const attr = element.attributes.filter(attr => attr.name === 'class')[0]
    if (attr && attr.value === selector.replace('.', '')) {
      return true
    }
  }
  // 标签选择器
  else if (selector === element.tagName) {
    return true
  }

  return false
}

function computeCSS (element) {
  // stack.slice() 复制数组
  const elements = stack.slice().reverse()
  // 获取和计算父元素是由内而外的，css由右向左解析

  if (!element.computedStyle) {
    element.computedStyle = {}
  }

  for (let rule of rules) {
    const selectorParts = rule.selectors[0].split(" ").reverse()

    if (!match(element, selectorParts[0])) { // 如果当前元素不匹配
      continue
    }

    let matched = false

    // 循环elements和selectorParts看是否完全匹配
    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++
      }
    }
    if (j >= selectorParts.length) {
      matched = true
    }
    if (matched) {
      const sp = specificity(rule.selectors[0])
      const computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) { // property: width
          computedStyle[declaration.property] = {}
        }

        if (!computedStyle[declaration.property].specificity) { // 如果是空的，存一下sp
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) { // 如果原来优先级低，新写sp
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }

      console.log(element.computedStyle)
    }
  }
}

function emit (token) {
  let top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    computeCSS(element)

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end doesn\'t match')
    } else {
      // 遇到style标签时，执行添加css规则的操作
      if (top.tagName === 'style') {
        addCssRules(top.children[0].content)
      }
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

const EOF = Symbol('EOF') // EOF: End Of File 不设置可能会导致接受状态未被关闭

function data (c) {
  if (c === '<') {  // 匹配
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

function tagOpen (c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    emit({
      type: 'text',
      content: c
    })
    return ;
  }
}

function tagName (c) {
  // 换行，空格，换行
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c//.toLowerCase
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    // return beforeAttributeName
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName (c) {
  if (c.match(/^\t\n\f $/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') {

  } else if (c === '"' || c === '\'' || c === '<') {

  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue
  } else if (c === '"') {
    return doubleQuotedAttributeValue
  } else if (c === '\'') {
    return singleQuotedAttributeValue
  } else if (c === '>') {
    // return data
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue (c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue (c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue (c) {
  if (c.match(/^\t\n\f $/)) { // 空格结束，属性赋值
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c === '/') { // 
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {

  } else if (c === '\'' || c === '"' || c === '<' || c === '=' || c === "`") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag (c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === 'EOF') {

  } else {

  }
}

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>') {

  } else if (c === EOF) {

  } else {

  }
}

function afterAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

module.exports.parseHTML = function parseHTML (html) {
  let state = data
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  // console.log(stack[0])
}
