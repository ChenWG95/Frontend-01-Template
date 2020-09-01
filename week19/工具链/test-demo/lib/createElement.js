import { enableGesture } from './gesture'

/** 创建元素函数：决定组件设计 */
export function create (Cls, attributes, ...children) {
  let o;
  // 知识点1
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: {}
    })
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }

  let visit = (children) => {
    for (let child of children) {
      if (typeof child === 'object' && child instanceof Array) {
        visit(child)
        continue
      }
      if (typeof child === 'string') {
        child = new Text(child)
      }
      o.appendChild(child)
    }
  }

  visit(children)

  return o
}

export class Text {
  constructor (text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Wrapper {
  constructor (type) { // config
    this.children = []
    this.root = document.createElement(type)
  }

  set id(v) { // property
    console.log('Parent::id', v)
  }

  get style() {
    return this.root.style
  }

  setAttribute(name, value) { // attribute
    this.root.setAttribute(name, value)

    // 绑定on事件
    if (name.match(/^on([\s\S]+)$/)) {
      const eventName = RegExp.$1.replace(/^[\s\S]/, (v) => v.toLowerCase())
      this.root.addEventListener(eventName, value)
    }

    // 绑定手势事件
    if (name === 'enableGesture') {
      enableGesture(this.root)
    }
  }

  addEventListener() {
    this.root.addEventListener(...arguments)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }

  appendChild(child) { // children
    this.children.push(child)
  }
}