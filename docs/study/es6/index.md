# ES6 常用知识

`ECMAScript 6` (简称 `ES6`) 是 `JavaScript` 语言的下一代标准

`ECMAScript` 的提案流程

- `Stage 0 - Strawman`（展示阶段）
- `Stage 1 - Proposal`（征求意见阶段）
- `Stage 2 - Draft`（草案阶段）
- `Stage 3 - Candidate`（候选人阶段）
- `Stage 4 - Finished`（定案阶段）

一个提案只要能进入 `Stage 2` 就差不多肯定会包括在以后的正式标准里面

[ECMAScript 当前的所有提案](https://github.com/tc39/ecma262)

::: tip ES6 和 ES2015 的区别
`ES2015` 是一个年份标记，表示当年发布的 `ECMAScript` 标准的正式版本，其全称为《`ECMAScript 2015` 标准》（简称 `ES2015`）<br>
`ES6` 是一个历史名词也是一个泛指，含义是 `5.1` 版以后的 `JavaScript` 的下一代标准，涵盖了 `ES2015、ES2016、ES2017 ES2018` 等等
:::

## let const

`ES6` 新增了 **`let`** 和 **`const`** 命令，用于声明变量，其声明的变量只在声明所在的块级作用域内有效

::: tip let const var 的区别

- `var` 声明的变量会提升到作用域的顶部，`let const` 不存在变量提升
- `var` 声明的全局变量会被挂载到全局对象 `window` 上，而 `let const` 不会
- `var` 可以对一个变量进行重复声明，而 `let const` 不能重复声明
- `var` 声明的变量作用域范围是函数作用域，`let const` 声明的变量作用域范围是块级作用域
- `const` 声明的是一个只读的常量，一旦声明常量的值就不能改变(必须对变量进行初始化)
  - 基本类型保证值不可变
  - 引用类型保证内存指针不可变

:::

### 变量提升

```js
console.log(a) // 输出 undefined
console.log(b) // 报错
console.log(c) // 报错

var a = 'var'
let b = 'let'
const c = 'const'
```

[为什么 let 和 const 不存在变量提升？ - 知乎](https://www.zhihu.com/question/535442142/answer/2510328090)

### 挂载到全局对象

```js
var a = 'var'
let b = 'let'
const c = 'const'

console.log(window.a) // 输出 var
console.log(window.b) // 输出 undefined
console.log(window.c) // 输出 undefined
```

### 重复声明

```js
var a = 'var'
var a
console.log(a) // 输出 var

let b = 'let'
let b // 报错
```

### 作用域范围

```js
function fn() {
  if (true) {
    var a = 'var'
    let b = 'let'

    console.log(a) // 输出 var
    console.log(b) // 输出 let
  }

  console.log(a) // 输出 var
  console.log(b) // 报错
}

fn()
```

### const 常量定义

```js
const NAME = 'maomao'
NAME = 'maomao1996' // 报错
```

## 模板字符串

模板字符串 (template string) 是增强版的字符串，用反引号(**`**)标识。它可以当作普通字符串、定义多行字符串或者在字符串中嵌入变量、函数调用以及表达式

```js
let name = 'maomao'
let age = 18

/* ES5 拼接字符串 */
let es5Str = '我叫: ' + name + '，我的年龄是: ' + (age + 1) + ' 岁'

/* ES6 模板字符串 */
let es6Str = `我叫: ${name}，我的年龄是: ${age + 1} 岁`
```

## 解构赋值

### 解构对象

```js
const obj = {
  name: 'maomao',
  age: 18
}

// ES5 写法
const name = obj.name
const age = obj.age

/* ES6 解构写法 */
const { name, age } = obj
// 重命名
const { name: myName } = obj

/* 指定默认值 */
const { x = 1, y = 2 } = { y: null }
console.log(x) // 1
console.log(y) // null
```

### 解构数组

```js
const arr = ['maomao', 18]

/* ES5 写法 */
const name = arr[0]
const age = arr[1]

/* ES6 解构写法 */
const [name, age] = arr
const { 0: name, 1: age } = arr

/* 指定默认值 */
const [x = 1] = []
const [y = 2] = [undefined]
console.log(x) // 1
console.log(y) // 2

const [z = 3] = [null]
console.log(z) // null
```

### 解构字符串

字符串也可以解构赋值，因为字符串被转换成了一个类似数组的对象

```js
const [a, b, c] = 'maomao'
console.log(a) // m
console.log(b) // a
console.log(c) // o

/* 解构 length 属性 */
const { length } = 'maomao'
console.log(length) // 6
```

::: tip 解构赋值注意点

- 解构数组和字符串时变量的取值由它的位置决定
- 解构对象时变量必须与属性同名，才能取到正确的值
- 变量在没有找到对应的值，多余的变量会被赋值为 `undefined`
- 在指定默认值时，只有属性值严格等于 `undefined` 才会生效
- 数组本质是特殊的对象，因此可以对数组进行对象属性的解构
- 解构数值和布尔值时会通过其对应的包装函数将其转换成对象再解构
- `undefined` 和 `null` 无法转为对象，在解构时会报错

```js
const { toString } = 123
toString === Number.prototype.toString // true

const { toString } = true
toString === Boolean.prototype.toString // true

const { x } = undefined // TypeError
const { y } = null // TypeError
```

:::

