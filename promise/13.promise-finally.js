const { promisifyAll } = require('./my-promise/5.promise')
const fs = require('fs')
const path = require('path')
const fsPromise = promisifyAll(fs)


// Promise.prototype.finally = function (finallyCallback) {
//   return this.then(data => {
//     finallyCallback()
//     return data
//   }, err => {
//     finallyCallback()
//     throw err
//   })
// }

// Promise.resolve('hello').finally(() => { // 无论成功失败都执行
//   console.log('finally------')
// }).then(data => {
//   console.log(data, 'data')
// }).catch(err => {
//   console.log(err, 'err')
// })


// finally无论成功和失败都执行的方法
Promise.prototype.finally = function (finallyCallback) {
  return this.then(data => {
    // Promise.resolve可以等finallyCallback执行完毕
    return Promise.resolve(finallyCallback()).then(() => data)
  }, err => {
    return Promise.resolve(finallyCallback()).then(() => { throw err })
  })
}

// 假如有个需求   无论用户有没有评价完成  都要去发一个请求保存状态
Promise.reject('hello').finally(() => { // 无论成功失败都执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('finally------')
      resolve()
    }, 1000);
  })
}).then(data => {
  console.log(data, 'data')
}).catch(err => {
  console.log(err, 'err')
})

