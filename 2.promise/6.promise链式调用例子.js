

// 链式调用：上一个的输出是下一个人的输入

const fs = require('fs')
const path = require('path')

// 希望解决回调地狱的问题，恶魔金字塔  就采用promise来解决这个问腿

function readFile(url, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, encoding, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

// 1.promise中的then传入的方法，返回的如果不是promise那么会将这个结果传递给下一次then的成功中去
// 2.如果then传入的方法在执行的时候,出错了 会执行下一次then的失败
// 3.如果then传入的方法在执行的时候, 返回的是一个promise,那么会根据promise的状态来决定下一次then的成功还是失败


// 什么情况会走失败？ 1）抛出异常 2）返回的是一个失败的promise
// 其他情况全部走成功


readFile(path.resolve(__dirname, 'file.txt'), 'utf-8').then(value => {
  // return 100
  // throw new Error()
  return readFile(path.resolve(__dirname, value), 'utf-8')
}).then(value => {
  console.log('下次promise的成功', value)
}, reason => {
  console.log('下次promise的失败', reason)
}).then(value => {
  console.log('成功', value)
}, reason => {
  console.log('失败', reason)
})




// fs.readFile(path.resolve(__dirname, 'file.txt'), 'utf-8', function (err, data) {
//   if (err) return err
//   fs.readFile(path.resolve(__dirname, data), 'utf-8', function (err, data) {
//     if (err) return err
//     console.log(data)
//   })
// })
