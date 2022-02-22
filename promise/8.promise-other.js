
const fs = require('fs')
const path = require('path')
const Promise = require('./my-promise/2.promise')

// function readFile(url, encoding) {
//   // 延迟对象的使用场景
//   let dfd = Promise.deferred()
//   fs.readFile(path.resolve(__dirname, url), encoding, function (err, data) {
//     if (err) return dfd.reject(err)
//     dfd.resolve(data)
//   })

//   return dfd.promise
// }

// readFile('file.txt', 'utf-8').then(data => {
//   console.log(data)
// })

// Promise.resolve  Promise.reject 
// 写法一*****
// new Promise((resolve, reject) => {
//   resolve('ok')
// }).then(data => {
//   console.log(data)
// })

// 上下等价  与上边写法一等价*****
Promise.resolve('ok').then(data => {
  console.log(data)
})

// catch 捕获异常


