const { promisifyAll } = require('./my-promise/5.promise')

const fs = require('fs')
const path = require('path')

const fsPromise = promisifyAll(fs)

// race 方法 赛跑就是以第一个结果为基准，取最先的结果为准，其他的代码还会执行，只是不采用结果了

Promise.race = function (promises) {
  let result = []
  let times = 0
  return new Promise((resolve, reject) => {

    function processResult(data, index) {
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

Promise.race([fsPromise.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8'), fsPromise.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8')])
  .then(res => {
    console.log(res)
  }).catch(err => console.log(err))