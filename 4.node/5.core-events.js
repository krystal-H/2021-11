
const EventEmitter = require('./6.events') // 可以直接引用的模块，不需要自己写或者引入模块，就是核心模块
const util = require('util')
// 发布订阅  on订阅  emit发布   off取消订阅  once绑定一次
function Girl() {

}

// 原型继承有三种写法
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype) 
// Gril.prototype = Object.create(EventEmitter)
// Girl.prototype.__proto__ = EventEmitter.prototype

util.inherits(Girl,EventEmitter) // node中的原型继承

// const events = new EventEmitter
// 一般情况我们实现继承（类继承+实力继承+原型继承 = es6 extend）
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
const events = new Girl

// // 订阅完就触发可以采取这种方式
// process.nextTick(() => { // nextTick里面可以解决异步调用问题，方式优于promise.then
//   events.emit('女孩', 'boy')
// })

const cry = function (name) {
  console.log('哭', name)
}

events.on('女孩', cry)
events.on('女孩', function (name) {
  console.log('吃', name)
})
const shopping = function (name) {
  console.log('逛街', name)
}
events.once('女孩', shopping)
events.off('女孩', shopping) // 拿shopping去移除one 肯定有问题，需要创建关联

events.emit('女孩', 'boy') // 执行完毕后，就将这个函数移除掉了  下次不会再继续触发了
events.off('女孩', cry)
events.emit('女孩', 'boy') // 触发过了，再次触发once就不在执行

