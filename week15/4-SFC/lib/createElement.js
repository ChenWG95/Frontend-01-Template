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