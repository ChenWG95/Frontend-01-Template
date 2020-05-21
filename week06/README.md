# 浏览器-DOM树构建

## 状态机
## 编程思想：有限状态机
每一个状态都是一个机器
- 每个机器里做计算/存储/输出
- 所有机器接受的输入一致
- 本身并无状态，如果用函数表示就是纯函数

每一个机器知道下一状态
- Moore型：都有确定的下一个状态
- Mealy型：根据输入决定下一状态

## Example
在一个字符串中，找到字符“ab”
str.search
str.indexOf
正则（底层一般是状态机）
````js
// find ab
function match (string) {
  let foundA = false
  for (let c of string) {
    if (c === 'a') {
      foundA = true
    } else if (foundA && c === 'b') {
      return true
    } else {
      foundA = false // 添加重置
    }
  }
  return false
}

console.log(match("I abm groot"))
````
find abcdef GG
如何更加简单？

## JS中的有限状态机
````js
// 每个函数就是一个状态
function state(input) { // 参数就是输入
  // 处理状态逻辑
  return next // 返回值作为下一状态，如果next写死则是Moore型，与输入有关则是Mealy型
}

while (input) {
  state = state(input)
}
````
### Example
````js
// 状态机demo
function match (string) {
  var state = start
  for (let c of string) {
    state = state(c)
  }

  return state === end
}

function start (c) {
  if (c === 'a') {
    return foundA
  } else {
    return start(c) // 直接返回start会出现解析aab: start(a) => FoundA(a) => start，导致错误
  }
}
function foundA (c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c) // 直接返回start会出现解析aab: start(a) => FoundA(a) => start，导致错误
  }
}
function foundB (c) {
  if (c === 'c') {
    return end
  } else {
    return start(c) // 直接返回start会出现解析aab: start(a) => FoundA(a) => start，导致错误
  }
}
function end (c) {
  return end
}
````

[match-abababx](./match-abababx.js)

## 浏览器执行过程
![浏览器执行过程](./浏览器执行过程.png)

## 浏览器DOM树构建
[toy-browser](./toy-browser)
