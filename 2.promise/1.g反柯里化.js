// 柯里化是让函数变得更具体（缩小范围），反柯里化函数就是放大函数的范围
// Object.prototype.toString.call('abc')
// console.log(toString('abc'))

// console.log(Array.prototype.push.call([], 'abc'))
// console.log(push([], 'abc'))

function uncurrying(fn) {
  return function (...args) { // toString
    // Function.prototype.call 原型上的call方法本身就是一个函数
    // 通过call方法调用call方法
    // 让Function.prototype.call里边的this指向fn 并且让call方法执行
    // return fn.call(...args) // 不应调函数本身的，应该调原型上的
    // return (Function.prototype.call).call(fn, ...args)
    return (Function.prototype.call).apply(fn, args)
  }
}

Object.prototype.toString.call = function () {
  console.log('call')
}

let toString = uncurrying(Object.prototype.toString)
console.log(toString('abc'))
console.log(toString(123))

