const parse = require('./lib/parse.js')

module.exports = function (source, map) {
  console.log('My loader is running!', this.resourcePath)
  const tree = parse.parseHTML(source)
  console.log('tree', tree)
  const scriptStr = tree.children[2].children[0].content

  // find template & script 进行挂载
  let template = null
  let script = null

  for (let node of tree.children) {
    if (node.tagName === 'template')
      template = node.children.filter(e => e.type !== 'text')[0]
    if (node.tagName === 'script')
      script = node.children[0].content
  }

  // template => create(tagName, attr, children)
  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }

    let attrs = {}

    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }

    let children = node.children.map(node => visit(node))
    return `create('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`
  }

  let r = `
import { create, Text, Wrapper } from './createElement';
export class Carousel {
  render() {
    return ${visit(template)}
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
  setAttribute(name, value) {
    this[name] = value
  }
}
`
  return r
}
