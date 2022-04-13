
const fs = require('fs')
const path = require('path')


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
// *************1种方法************
let readFile1 = promisify(fs.readFile) // 仅仅针对node中的api  因为node中的回调方法  都有err 和data

// 将node中的异步api转换成promise写法（但是只可转换一个方法fs.readFile  不方便）
function promisify(fn) {  // fs.readFile
  return function (...args) { // readFile可调用  返回方法
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

Promise.all([readFile1(path.resolve(__dirname, 'name.txt'), 'utf-8'), readFile1(path.resolve(__dirname, 'age.txt'), 'utf-8'), '123']).then(data => {
  console.log(data)
})

// ************对象中多种方法*************
let fsPromise = promisifyAll(fs)

function promisifyAll(obj) { // obj->fs   obj[key]->readFile/writeFile/...
  let result = {}
  for (const key in obj) { // 判断值是不是一个函数  是函数就转换成promise
    result[key] = typeof obj[key] === 'function' ? promisify(obj[key]) : obj[key]
  }
  return result
}

Promise.all([fsPromise.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8'), fsPromise.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8'), '123']).then(data => {
  console.log(data)
})
