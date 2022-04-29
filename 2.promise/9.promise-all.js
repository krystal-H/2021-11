
const fs = require('fs')
const path = require('path')

const Promise1 = require('./my-promise/4.promise')

function readFile(url, encoding) {
  // 延迟对象的使用场景
  let dfd = Promise1.deferred()
  fs.readFile(path.resolve(__dirname, url), encoding, function (err, data) {
    if (err) return dfd.reject(err)
    dfd.resolve(data)
  })

  return dfd.promise
}

// 执行完毕后会将结果放到数组里，all的含义就是都成功才成功，有一个失败就失败了
Promise.all = function (promises) {
  let result = []
  let times = 0
  return new Promise((resolve, reject) => {

    function processResult(data,index) {
      result[index] = data
      if (++times == promises.length) {
        resolve(result)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]
      // 将其包裹成prmise对象
      Promise.resolve(promise).then(data => {
        // console.log(data, i)
        processResult(data, i)
      })
    }
  })
}

Promise.all([readFile(path.resolve(__dirname, 'name.txt'), 'utf-8'), readFile(path.resolve(__dirname, 'age.txt'), 'utf-8'), '123']).then(data => {
  console.log(data)
})