
const Promise = require('./my-promise/promise')

let p1 = new Promise((resolve, reject) => {
  resolve(100)
  // reject('失败')
  // setTimeout(() => {
  //   resolve(100)
  //   // reject('reject')
  // }, 1000);
}).then(data => {
  // return data // 1.x---普通值
  // throw new Error('失败') // 2.x---抛错
  // 3. x---返回的是个promise
  return new Promise((resolve, reject) => {
    
  })
}, err => {
  return err
})

p1.then(data => {
  console.log(data,'00000')
}, err => console.log(err))

// x 就是then方法中的返回值
// p1 调用then后返回的新的promise
// 我们用x的值 来决定p1 是成功还是失败

// 当一个promise调用then后，还可以继续then 需要返回一个promise
// 一个promise如果一旦成功了不能变成失败态