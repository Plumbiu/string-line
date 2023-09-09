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

## 为什么不是 diff

事实上 `string-line` 和 `diff` 应用的范围、甚至返回的格式不一样，`diff` 可以用于 `object`、`array` 等各种类型的比较，`string-line` 只适用于字符串，因此不能将两者混为一谈。