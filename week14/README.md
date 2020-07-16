# 组件化

经过之前的学习我们知道了组件体系的大概组成分为

- property
- method
- inherit
- attribute
- config & state
- event
- lifeCycle
- children

经过实际的Carousel组件实践，我们将更深一步进行理解

## JSX

我们的组件基于JSX，所以首先理解JSX。

JSX经由babel插件的转化会从:

````jsx
const MyComponent = <Cls class="carousel"></Cls>
````

转化为：

````js
createElement(Cls, attribute, ...children)
````

形式

此处的createElement函数是由我们自己编写的，所以我们第一步就是完善createElement函数

## createElement函数

createElement函数是为了创建我们的组件/元素，并且赋值属性，插入子节点。

````js
function createElement (Cls, attributes, ...children) {
  let o = new Cls()

  for (let name in attributes) {
    o.setAttribute(name, attributes[name])  // Cls之后会完善的方法
  }

  for (child of children) {
    o.appendChild(child)  // Cls之后会完善的方法
  }
}
````

此处有两个小知识点：

1. 当传入`createElement`的`Cls`为小写时，会被转化为字符串认为是原生元素

2. 文本节点也会作为`children`传递进来

所以我们还需要完善一下：

````js
function createElement (Cls, attributes, ...children) {
  let o

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)  // 原生创建函数
  } else {
    o = new Cls() // 组件创建函数
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name])  // Cls之后会完善的方法
  }

  for (child of children) {
    if (typeof child === 'string') {
      child = new Text(child)
    }
    o.appendChild(child)  // Cls之后会完善的方法
  }
}
````

## Text, Wrapper, Cls

接下来我们对上述的Text, Wrapper, Cls进行补全完善，根据上述`createElement`的代码我们可以发现这些类应该大概有如下特征

````js
// 文本节点
class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {  // 由于需要被插入，所以需要添加一个mountTo方法
    parent.appendChild(this.root)
  }
}

// 原生元素节点
class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }

  setAttribute(name, value) { ... }
  appendChild(child) { ... }
  mountTo(parent) { ... } // 联系视图，挂载至某个DOM节点
}

// 自定义组件节点
class Cls {
  constructor(type) {
    this.children = []
    this.root = document.createElement('div')
  }

  setAttribute(name, value) { ... }
  appendChild(child) { ... }
  mountTo(parent) { ... } // 联系视图，挂载至某个DOM节点
}
````

## render

组件`Cls`具体渲染成什么样子，我们可以通过`render函数`自由的定义组件，最后我们只需要把`render函数`处理过的结果通过`mountTo`方法挂载至对应DOM节点即可

````jsx
class Cls {
  constructor(type) {
    this.children = []
    this.root = document.createElement('div')
  }

  setAttribute(name, value) { ... }
  appendChild(child) { ... }
  mountTo(parent) { ... }
  render() {
    let children = this.data.map(url => {
      return <img src={url}/>
    })
    let root = <div class="carousel">
      { children }
    </div>
  }
}
````

## 小技巧

取0..x的循环且不超出x时可以使用`%`

````js
var x = 6

while (position++ >= 20) {
  var position = position % x // 如果是--场景可能存在负数，则需要改写为: position = (position + x) % x
  console.log(position)
}
````

## 本周作业

[组件项目](./my-component)