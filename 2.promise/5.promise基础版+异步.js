// promise默认是一个类，
// 用的时候需要new，而且创建的实例上都有一个then方法，
// 同时在new的过程中需要传入一个执行器executor

// 1) executor会立即执行，并且传入两个参数resolve,reject
// 2) promise中有三种状态pending(既不成功也不失败), fulfilled(成功), or rejected(失败)
// 3) promise中有一个value属性用来描述成功的值  reason描述失败的原因
// 4) 当状态是pengding的时候,可以转化成成功或失败, 否则不能去改变状态
// 5)promise中如果出现异常也会执行失败的逻辑

const Promise = require('./my-promise/1.promise')
const p1 = new Promise((resolve, reject) => {
  // console.log(1)
  // throw new Error()
  // resolve('成功')
  // reject('失败')

  // 模拟异步
  setTimeout(() => {
    resolve('success')
  }, 1000)

})
// console.log(2)
p1.then((value) => { // then里边要有两个参数onFulfilld  onRejected
  console.log('成功---------', value)
}, (reason) => {
  console.log('失败---------', reason)
})

p1.then((value) => { // then里边要有两个参数onFulfilld  onRejected
  console.log('成功---------', value)
}, (reason) => {
  console.log('失败---------', reason)
})


// 实现promise的链式调用

