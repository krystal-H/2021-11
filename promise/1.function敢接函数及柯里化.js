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


// 2)我们可以通过高阶函数来实现的参数的保留

// 判断一个变量的类型：
// typeof只能判断基础类型  
// instanceof判断实例类型  
// constructor可以看当前实例有谁构造出来的
// Object.prototype.toString.call()

// function isType(val, type) {
//   return Object.prototype.toString.call(val) === `[object ${type}]`
// }
// // 这样写有弊端，假如用户的type输入错了，结果就出错
// console.log(isType('hello', 'String'))
// console.log(isType(12, 'String'))

// so，改造一下  利用高阶函数实现type的保留，只需用户传入值就可以判断

function isType(type) {
  return (val) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}

// 利用高阶函数保留参数变量 -> 函数柯里化、函数的反柯里化
let isString = isType('String') // 闭包：函数声明的作用域和执行的作用域不一样，这时候就会导致闭包

console.log(isString('hello'))
console.log(isString(12))


// 函数柯里化 就是将多个参数转化成一次传入一个参数
// 异步编程问题 主要有一个并发处理的问题


// 通用的柯里化函数
function sum(a, b, c, d, e, f) {
  return a + b + c + d + e + f
}
// console.log(sum(1, 2, 3, 4, 5, 6))

function curring(fn) {
  // 两种情况，需要看传入的参数个数和预制的+执行的参数个数判断，如果不满足个数则返回一个函数，满足个数则让函数执行
  const len = fn.length // 函数参数的个数
  const presetArgs = Array.from(arguments).slice(1)
  return (...args) => {
    const allArgs = [...presetArgs, ...args]
    if (allArgs.length >= len) {
      return fn(...allArgs) // 参数满足就让柯里化的函数直接执行
    } else {
      return curring(fn, ...allArgs) // 如果不满足则递归柯里化
    }
  }
}

let fn = curring(sum, 1, 2)
// console.log(fn(3, 4)(5)(6))

// 这样就可以用下通用柯里化方法
let newType = curring(isType)
const fnString = newType('String')
const fnNumber = newType('Number')

console.log(fnString('abc'), '----')
console.log(fnNumber(123), '----')
