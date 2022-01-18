// 什么是高阶函数  1.一个函数返回一个函数   2.一个函数可以接受一个参数是函数

// 利用高阶函数可以处理哪些问题 
// 1）扩展方法

function say(args) {// 需要对say方法进行扩展，但是不能修改源代码
  console.log('say', args)
}

Function.prototype.before = function (cb) {
  return (...args) => {
    cb()
    // 谁调before  this就是谁
    this(...args) // 扩展原来的函数
  }
}

let newSay = say.before(() => {
  console.log('beforeSay')
})

newSay('hello')
