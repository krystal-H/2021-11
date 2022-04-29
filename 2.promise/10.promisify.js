
const fs = require('fs')
const path = require('path')

function promisify(fn) {
  return function (...args) { // fn
    return new Promise((resolve, reject) => { // fn执行后可以.then 则需要返回一个promise
      fn(...args, function (err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

// let fn = promisify(fs.readFile)
// fn(path.resolve(__dirname, 'name.txt'), 'utf-8').then(data => {
//   console.log(data)
// })

function promisifyAll(obj) {
  let result = {}
  for (let key in obj) {
    result[key] = typeof obj[key] == 'function' ? promisify(obj[key]) : obj[key]
  }
  return result
}

let newFn = promisifyAll(fs) // 讲fs中的所有的api全部转化成promise的形式

newFn.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8').then(data => {
  console.log(data)
})

