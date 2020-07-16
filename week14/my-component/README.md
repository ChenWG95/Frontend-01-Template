# JSX思路

<!-- <Cls> => 视图的过程 -->
1. Cls经由babel-loader转化为 create(ele, attr, child/text)模式
2. 根据ele创建对应的Cls/Element
3. setAttribute
4. child插入

  ````js
  new Cls {
    constructor () {
      this.children = []
    }

    setAttribute(name, value) {}

    appendChild(child) {
      this.children.push(child)
    }
  }

  // 到此时可以得到一个含有children和设好属性的Cls
  ````

5. Cls中添加root与mountTo与视图建立联系

  ```js
  new Cls {
    constructor () {
      this.root = document.createElement('div')
    }

    mountTo (parent) {
      parent.appendChild(this.root)
      for (let child of children) {
        child.mountTo(this.root)
      }
    }
  }
  ```

6. 渲染的时候自定义视图
  ```jsx
  new Cls {
    render() {
      return <article>
        <div></div>
        {this.slot}
      </article>
    }

    mountTo(parent) {
      this.slot = <div></div>
      for (let child of children) {
        this.slot.appendChild(child)
      }
      this.render().mountTo(parent)
    }

    appendChild(child) {
      this.slot.appendChild(child) // 这里是原生的appendChild
    }
  }
  ```
