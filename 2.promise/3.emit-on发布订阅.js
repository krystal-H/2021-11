// 用发布订阅的方式实现一下

const fs = require('fs') // node中自带核心模块
const path = require('path')

let events = {
  _events: [],
  on(cb) {
    this._events.push(cb)
  },
  emit(...args) { // 剩余操作符
    this._events.forEach(cb => cb(...args)) // 扩展运算符
  }
}

// 所谓的订阅就是把事情存到一个列表中  ，每次发布将列表中的函数依次执行
events.on(function (key) { // 每次发布都执行此函数
  console.log('读取完毕一次', key)
})

let school = {}
events.on(function (key, data) { // 每次发布都执行此函数
  school[key] = data
  if (Object.keys(school).length === 2) {
    console.log(school)
  }
})

fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', function (err, data) {
  events.emit('name', data)
})

fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8', function (err, data) {
  events.emit('age', data)
})


// 观察者模式  和  发布订阅模式  的区别
// 发布和订阅之间没有耦合关系，什么时候发布时取决于自己的
// 观察者模式  观察者和被观察者  如果被观察者发生了什么变化，会主动通知观察者去更新（收集：被观察者要收集观察者）
// 观察者模式是包含发布订阅的


