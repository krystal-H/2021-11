// 前端常见的就是  同时发送多个请求，最终拿到多个请求的返回值来进行渲染页面

const fs = require('fs') // node中自带核心模块
const path = require('path')

// __dirname当前文件的根路径
// console.log(path.resolve(__dirname, './a.txt')) // 绝对路径

// js在执行的时候会有一个事件环的机制  默认先执行当前的上下文
// 使下边方法并行执行
let school = {}

// 这种写法比较脆弱，假如school里边添加不定数属性不好控制，
// 应该统计done的执行次数，每次调done  次数减减
// function done() {
//   if (Object.keys(school).length === 2) {
//     console.log(school)
//   }
// }

function after(times, callback) { // 暂存times  同时返回一个新的函数
  const obj = {}
  return function (key, value) { // done
    obj[key] = value
    if (--times === 0) {
      callback(obj)
    }
  }
}

const done = after(2, (obj) => {// 调用done两次后再去执行对应的问题
  console.log(obj)
})

fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', function (err, data) {
  // school.name = data
  done('name', data)
})

fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8', function (err, data) {
  // school.age = data
  done('age', data)
})

