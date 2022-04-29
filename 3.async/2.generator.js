// function* read() {
//   let a = yield 'vue';
//   console.log(a)
//   let b = yield 'react';
//   console.log(b)
//   let c = yield 'node';
//   console.log(c)
//   return '123';
// }

// let it = read() // it.next() {value,done}

// console.log(it.next()) // 遇到yield就停止,此时没有赋值  第一次调用next是无意义的
// console.log(it.next('ab')) // yield的返回值就是调用下次next传递的参数
// console.log(it.next('ccc'))

const fs = require('fs').promises; // 这里拿到的所有fs都是promise方法
const path = require('path')

function* read() {
  let content
  try { // 使用it.throw时
    let filename = yield fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8')
    content = yield fs.readFile(path.resolve(__dirname, filename), 'utf8')
  } catch (error) {
    console.log('err---', error)
  }

  return content
}

// co实现原理
function co(it) {
  return new Promise((resolve, reject) => {
    function next(v) { // 异步迭代写一个迭代函数 递归调用
      let { value, done } = it.next(v)
      if (!done) {
        Promise.resolve(value).then(data => {
          next(data)
        }, reject
        // () => {
        //   it.throw('异常') // 可以再generator中通过try catch进行捕获 
        // }
        )
      } else { // 迭代完毕
        resolve(v)
      }
    }
    next()
  })
}

// npm init -y
// npm install co
// 用法如下
// const co = require('co'); // 这是一个第三方库 用之前需要安装
co(read()).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})

// -----------------用这种方法嵌套层数多的时候不合理--------------此时借助一个库  co  可以解决，如上
// let it = read() // 获取了迭代器
// let {value,done} = it.next()
// if (!done) {
//   // 假如value不是promise要处理一下
//   Promise.resolve(value).then(data => {
//     let { value, done } = it.next(data)
//     if (!done) {
//       Promise.resolve(value).then(data => {
//         let { value, done } = it.next(data)
//         console.log(value, done)
//       })
//     }
//   })
// }

