import { create, Text, Wrapper } from './createElement'

class Carousel {
  constructor (config) { // config
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }

  setAttribute(name, value) { // attribute
    this.attributes.set(name, value)
  }

  appendChild(child) { // children
    this.children.push(child)
  }

  render() {
    let children = this.attributes.get('data').map(url => {
      let element = <img src={url}/>
      element.addEventListener('dragstart', event => event.preventDefault())
      return element
    })
    let root = <div class="carousel">
      { children }
    </div>

    // 自动播放 nextPic
    let position = 0
    let nextPic = () => {
      let nextPosition = (position + 1) % this.attributes.get('data').length

      let current = children[position]
      let next = children[nextPosition]

      // 动画前位置
      current.style.transition = 'none'
      next.style.transition = 'none'
      current.style.transform = `translateX(${- 100 * position}%)`
      next.style.transform = `translateX(${-100 * nextPosition + 100}%)`

      // requestAnimation需2次，因为第一次调用为第一帧，第二次调用为第二帧
      // transition需要间隔，否则不会生效
      // 动画后位置，连续的DOM操作会被合并
      setTimeout(() => {
        current.style.transition = ''	// 意味着使用CSS规则
        next.style.transition = ''
        current.style.transform = `translateX(${- 100 * position - 100}%)`
        next.style.transform = `translateX(${-100 * nextPosition}%)`

        position = nextPosition
      }, 16)

      setTimeout(nextPic, 3000)
    }

    // setTimeout(nextPic, 3000)

    // 鼠标事件
    root.addEventListener("mousedown", event => {
      let data = this.attributes.get('data')
      let startX = event.clientX, startY = event.clientY
      // 找到前一个、当前、后一个三个元素
      // 这样会有负数，可以+length
      let lastPosition = (position - 1 + data.length) % data.length
      let nextPosition = (position + 1) % data.length

      let last = children[lastPosition]
      let current = children[position]
      let next = children[nextPosition]

      // 设置到正确位置
      last.style.transition = 'none'
      current.style.transition = 'none'
      next.style.transition = 'none'
      last.style.transform = `translateX(${- 500 * lastPosition - 500}px)`
      current.style.transform = `translateX(${- 500 * position}px)`
      next.style.transform = `translateX(${-500 * nextPosition + 500}px)`

      let move = event => {
        // 设置对应移动的位置
        last.style.transform = `translateX(${event.clientX - startX - 500 * lastPosition - 500}px)`
        current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
        next.style.transform = `translateX(${event.clientX - startX - 500 * nextPosition + 500}px)`
      }
      let up = event => {
        // 拖过一半就要变化了
        let offset = 0

        if (event.clientX - startX > 250) {
          // 向右，position需要-
          offset = 1
        } else if (event.clientX - startX < -250) {
          // 向左，position需要+
          offset = -1
        }

        last.style.transition = ''
        current.style.transition = ''
        next.style.transition = ''

        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

        position = (position - offset + data.length) % data.length

        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })

    return root
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}

let component = <Carousel data={[
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
  ]}>
</Carousel>

component.mountTo(document.body)
