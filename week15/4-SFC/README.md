# SFC思路

模仿VueSFC，将SFC转化为为html代码

## 创建配置webpackLoader

首先我们按照webpack文档编写如下loader，并配置在webpack.config.js中

````js
{
  test: /\.view/,
  use: {
    loader: path.resolve('./loader.js')
  }
}
````

> loader其实就是一个函数，这个函数接收一个string类型的source源码，返回一个string类型的source源码。中间怎么处理就是loader所做的事情了

## 编写webpackLoader

首先按照loader函数的规范创建一个函数

````js
module.exports = function (source, map) {
  console.log('这就是我的webpackLoader')

  return ''
}
````

随后我们按照Vue的文档上面创建一个文件名以.view结尾的文件，我们的Loader会把这个文件中的代码转化为对应的html

````js
// component.view
<template>
  <div>
    <img/>
  </div>
</template>

<script>
export default {
  el: '#example',
  data: {
    message: 'Hello!'
  }
}
</script>
````

## Loader第一步：解析html代码

通过`htmlParse`，我们可以将html转化成对应的`tree节点树`，也就是如下这个模样

````js
{
  type: 'document',
  children: [
    {
      type: 'element',
      children: [Array],
      attributes: [Array],
      tagName: 'template'
    },
    { type: 'text', content: '\n\n' },
    {
      type: 'element',
      children: [Array],
      attributes: [Array],
      tagName: 'script'
    },
    { type: 'text', content: '\n' }
  ]
}
````

可以看到，我们解析出了template和script两部分，接下来我们只需要对于两部分分别进行解析处理

## Loader第二步：解析template代码

接下来我们需要对template部分进行html解析，解析标签与属性，通过创建createElement(tagName, attributes, children)函数，最终实现Component并将其挂载到dom树上

````js
const parse = require('./parse.js')

module.exports = function (source, map) {
  console.log('这就是我的webpackLoader')

  // 1. 获取htmlParse解析后的节点tree
  const tree = parse.parseHTML(source)
  // 2. 获取template
  const template = null

  for (let node of tree.children) {
    if (node.tagName === 'template')
      template = node
    if (node.tagName === 'script')
      script = node.children[0].content
  }
  // 3. 将获取的template转化为createElement形式
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

  visit(template)

  return ''
}
````

## Loader第三步：生成JSX代码

最后我们只需要把上一步通过`visit(template)`获取的`create`结果作为组件render结果返回即可

````js
const parse = require('./parse.js')

module.exports = function (source, map) {
  // ...第二步代码

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
````

## 渲染至页面

之后我们只需要把解析到的组件通过调用`mountTo`方法挂载至页面

````js
// main.js
import { Carousel } from './carousel.view'
import { create, Text, Wrapper } from './createElement.js'

let component = <Carousel></Carousel>

component.mountTo(document.body)
````
