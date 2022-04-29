
const Promise = require('./my-promise/2.promise')

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
    setTimeout(() => {
      // resolve(data)
      // reject(data)
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('okokok')
        }, 1000);
      }))
    }, 1000);
  })
}, err => {
  return err
})

p1.then(data => {
  console.log(data,'00000')
}, err => console.log(err, 'err'))


// 继续补充  参考原生的promise写2.promise.js中的原理
new Promise((resolve, reject) => {
  // resolve('ok')
  reject('err')
}).then().then().then().then(data => {
  console.log(data, '393939')
}, err => {
  console.log('my-err')
})


// x 就是then方法中的返回值
// p1 调用then后返回的新的promise
// 我们用x的值 来决定p1 是成功还是失败

// 当一个promise调用then后，还可以继续then 需要返回一个promise
// 一个promise如果一旦成功了不能变成失败态


// 1) promise and x refer to same object  错误用法  如果不处理不会发生任何错误信息 

// let p11 = new Promise((resolve, reject) => {
//   resolve()
// }).then(()=> {
//   return p11; // 不能自己等待自己完成
// })

// p11.then(() => {}, err => {
//   console.log(err)
// })

// 2) retrieving property  then
// let x = {}
// Object.defineProperty(x, 'then', {
//   get(){
//     throw new Error('not then')
//   }
// })

// console.log(x.then)