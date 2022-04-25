// promise 可以使用链式调用解决异步嵌套问题，并没有完全解决（核心还是靠回调）


// generator叫生成器函数  生成器是用来生成迭代函数的
function* read() {
  // return 123
  yield 'vue';
  yield 'react';
  yield 'node';
  return '123';
}

// 迭代器种具备一个next方法
let it = read()
console.log(it.next()) // 调用next会返回结果 {done:true, value: '每次输出的值'}
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next()) // 多执行就没有结果了

// 类数组转换成数组  length，索引，迭代方法
// Symbol 可以创建独一无二的值，而且这个Symbol还可以实现“元编程”  可以改变js的原有的实现，底层机制
let likeArr = {
  0: 1, 1: 2, 2: 3, length: 3,
  get [Symbol.toStringTag]() { return 'likeArray' },
  [Symbol.iterator]: function *() {
    let index = 0
    let len = this.length
    while (index != len) {
      yield this[index++]
    }
  }
  // [Symbol.iterator]() {
  //   let that = this // 类数组
  //   let index = 0
  //   // 要求返回值  而且标识是否迭代完成 {done: true, value: '结果'}
  //   return { // 自己模拟了一个迭代器，迭代器就是返回一个对象，这个对象上有个next方法
  //     next() {
  //       return {
  //         value: that[index],
  //         done: index++ === that.length
  //       }
  //     }
  //   }
  // }
}
console.log([...likeArr])
// console.log(likeArr.toString())


