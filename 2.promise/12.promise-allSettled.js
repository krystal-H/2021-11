const { promisifyAll } = require('./my-promise/5.promise')
const fs = require('fs')
const path = require('path')
const fsPromise = promisifyAll(fs)

// 新增的方法  可以获取无论成功还是失败的结果
Promise.allSettled = function (promises) {
  let result = []
  let times = 0
  return new Promise((resolve, reject) => {

    function processResult(data,index, status) {
      result[index] = status === 'fulfilled' ? {status, value: data} : {status, reason: data}
      if (++times == promises.length) {
        resolve(result)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]
      // 将其包裹成prmise对象
      Promise.resolve(promise).then(data => {
        // console.log(data, i)
        processResult(data, i, 'fulfilled')
      }, err => processResult(err, i, 'rejected'))
    }
  })
}

Promise.allSettled([
  fsPromise.readFile(path.resolve(__dirname, 'file.txt'), 'utf-8'),
  fsPromise.readFile(path.resolve(__dirname, 'file1.txt'), 'utf-8')
]).then(data => {
  console.log(data)
})