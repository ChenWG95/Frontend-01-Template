# 重学 JavaScript | 编程语言通识与JavaScript语言设计

## 课程目标
- 通过学习BNF让你可以读懂JS标准

## 编程语言通识
概述：多学几门语言，进行总结

### 语言分类
- 非形式语言
  - 中文，英语
- 形式语言（乔姆斯基谱系）：计算机语言
  - 0型 无限制文法
  - 1型 上下文相关文法：词和上下文有关
  - 2型 上下文无关文法：词和上下文无关
  - 3型 正则文法：能用正则表达式解析，限制表达能力

现代语言文法：
  - 词法：使用正则进行一波处理，语言 => 词
  - 语法：词 => 语法分析

### 产生式：定义语言
基础产生式用法：BNF
- 语法结构：尖括号括起来
  - 基础结构：终结符
  - 复合结构：非终结符
- 引号和中间字符表示终结符
- 可以有括号
- *：多次
- |：或
- +：至少一次

### 产生式练习
#### Example 1: 初识BNF
````
终结符： "a", "b"
Program: 顶级程序结构

<Program>:= "a"+ | "b"+
目前只支持单纯的"a"与"b"，如何支持"a","b"混用？递归

<Program>:= <Program> "a"+ | <Program> "b"+
aaabbbbbb ✅
````

#### Example 2: 定义加法
````
数字：
<Number> = "0" | "1" | "2" | ... | "9"

十进制：
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )

加法一版：
<Expression> = <DecimalNumber> "+" <DecimalNumber>
<Expression> = <Expression> "+" <DecimalNumber>

如果我们想要单独输入一个数字 1 这样也可以的话，可以把Expression修饰一下为<Expression> = <DecimalNumber>，且由于<Expression> = <Expression> "+" <DecimalNumber>所以可以直接简写为：
加法二版：
<Expression> = <DecimalNumber>
<Expression> = <Expression> "+" <DecimalNumber>

最终合为加法终版定义为：
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )
<Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>
````

#### Example 3: 定义四则运算
````
首先拿到之前得到的加法定义
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )

加法与乘法
<AdditiveExpression> = <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber>

加法与乘法的关系：1 + 2 * 3，左侧是<DecimalNumber>，右侧是<MultiplicativeExpression> "*" <DecimalNumber>，所以
<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber>
<AdditiveExpression> = <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber> | <AdditiveExpression> "+" <MultiplicativeExpression>

由于：MultiplicativeExpression = <DecimalNumber>
所以：<AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression>
最终得到：
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )

<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber>
<AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> |
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>

---

支持减法与除法
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )

<MultiplicativeExpression> = <DecimalNumber> |
  <MultiplicativeExpression> "*" <DecimalNumber> |
  <MultiplicativeExpression> "/" <DecimalNumber>
<AdditiveExpression> = <MultiplicativeExpression> |
  <AdditiveExpression> "+" <MultiplicativeExpression> |
  <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> |
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>

---

再加上括号
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | ... | "9") <Number>* )

<PrimaryExpression> = <DecimalNumber> |
  "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> |
  <MultiplicativeExpression> "*" <DecimalNumber> |
  <MultiplicativeExpression> "/" <DecimalNumber>
<AdditiveExpression> = <MultiplicativeExpression> |
  <AdditiveExpression> "+" <MultiplicativeExpression> |
  <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> |
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>
````

### 通过产生式再理解乔姆斯基谱系
形式语言（乔姆斯基谱系）：计算机语言
- 0型 无限制文法：?::=? 
  > 例如<a><b> ::= "c"
- 1型 上下文相关文法：词和上下文有关：?<a>?::=?<b>? 
  > 例如"a"<b>"c" ::= "a" "x" "c"
- 2型 上下文无关文法：词和上下文无关：<a>::=? 
  > 例如上述四则表达式
- 3型 正则文法：能用正则表达式解析，限制表达能力：<a>::=<a>? 

正则写四则运算的Expression
````
<Number> = "0" | "1" | "2" | ... | "9"
<DecimalNumber> = /[0]|[1-9][0-9]*/

<PrimaryExpression> = <DecimalNumber> |
  "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> |
  <MultiplicativeExpression> "*" <DecimalNumber> |
  <MultiplicativeExpression> "/" <DecimalNumber>
<AdditiveExpression> = <MultiplicativeExpression> |
  <AdditiveExpression> "+" <MultiplicativeExpression> |
  <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> |
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>
````

### EBNF
标准中：
终结符按照**加粗**方式表示
- 词法定义：：
- 语法定义：
通过对于BNF的了解就可以阅读JS规范中Grammar Summary对于词法和语法的定义

### 练习
把你知道的计算机语言按照上述分类进行分类
1:12答案

### 图灵完备性
图灵机：等价于任何有限逻辑数学过程的逻辑机器

命令式
  - goto
  - if和while
声明式
  - 递归
本质上所有编程语言都是反复调用图灵机的命令

### 动态与静态
动态
  - 在用户设备/在线服务器上，实际运行时的Runtime（运行时）
静态  
  - 在研发设备，产品开发时，Compiletime（编译时）

### 动静区别
- 强类型与弱类型：是否存在隐式转换，存在即弱，C++ TS
- 复合类型
  - 结构体：JS对象
  - 函数签名：参数与返回值 (T1, T2) => T3
- 子类型：类型复合与继承
  - 逆变：用Array<Child>的地方可以用Array<Parent>
  - 协变：用Array<Parent>的地方可以用Array<Child>

### 一般命令式编程语言
- Atom
- Expression
- Statement
- Structure
- Program

### 
通过定义一些语法
=>
用语义去解释
=>
最终决定运行时的状态

# JavaScript词法

## 本节目标
了解词法和类型

打开ES标准，看到语法第一句
sourceCharacter: any unicode code point

## Unicode
[unicode官网](https://home.unicode.org/)
[unicode规范](https://www.fileformat.info/info/unicode/)
什么是Unicode？字符集
什么是ASCII？字符集

unicode
- (blocks：顺序介绍)[https://www.fileformat.info/info/unicode/block/index.htm]
- (category：分类介绍)[https://www.fileformat.info/info/unicode/category/index.htm]
````js
for (let i = 10000; i < 10128; i++) {
    console.log(i.toString(16), String.fromCharCode(i))
}
````

你想要查码点的话
- String.fromCharCode(x)：查询第x位的码点（BMP之外）
- Number.toString(x)：把number转化为x进制

- String.codePointAt(x)（BMP之外）
- String.charCodeAt(x)（BMP之内）
> BMP：U+0000四位以内

## 中文字符
其实我们是可以用中文进行命名的
````js
var 厉害 = 1
````
但是为什么我们不用呢？因为中文在CJK中，超出ASCII范围，在不同环境可能会有字符编码问题。为了解决这个问题，JavaScript推出了\u转义
我们如何知道“厉害”是何码点值呢？
````js
const a = "厉害".codePointAt(0).toString(16)  // 5389
const b = "厉害".codePointAt(0).toString(16)  // 5bb3
`\u${a}` // 厉
`\u${b}` // 害

const \u5389\u5bb3 = 1
````
这样就可以了，我们在工作中可以通过工程手段进行自动转译，还有一种转译场景是“\u5389\u5bb3”

## JS词法
![Javascript词法](./Javascript词法.png)
详见《JS》标准中：A.1 Lexical Grammar章节
