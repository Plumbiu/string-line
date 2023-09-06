# string-line

> 用于处理字符串增减内容，非常轻量！

## 安装

```bash
npm i string-line
```

## 使用

```js
import sl from 'string-line'

// 初始化 diff 函数
const diff = sl(`
  hello world!
`)

// 传入新的字符串
console.log(diff(`
  你好世界！
`))
// 输出
/*
  {
    subs: ['hello world!'],
    adds: ['你好世界!']
  }
*/
```

## 参数

`string-line` 默认将 `\n` 作为分隔符，你可以传入其它正则表达式作为分隔符

```js
import sl from 'string-line'

// 初始化 diff 函数
const diff = sl('hello world!', /\s/)

// 传入新的字符串
console.log(diff('hello')
// 输出
/*
  {
    subs: ['world!'],
    adds: []
  }
*/
```