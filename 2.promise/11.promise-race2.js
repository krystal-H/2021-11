const { promisifyAll, Promise } = require('./my-promise/5.promise')

const fs = require('fs')
const path = require('path')
const fsPromise = promisifyAll(fs)

// race 方法 赛跑就是以第一个结果为基准，取最先的结果为准，其他的代码还会执行，只是不采用结果了
// Promise.race([fsPromise.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8'), fsPromise.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8')])
//   .then(res => {
//     console.log(res)
//   }).catch(err => console.log(err))



// 一般使用race实现超时处理 *******

// 定义超时逻辑
// let abort
// let p = new Promise((resolve, reject) => {
//   abort = reject
//   setTimeout(() => {
//     resolve('data======')
//   }, 2000)
// })

// setTimeout(() => {
//   abort('超时了----') // 这里只是借助了promise一旦失败就不成功了，但是promise原有的逻辑还是会执行
// }, 1000);


// 假如需要多个函数的时候，要声明多个abort去手动赋值状态，不合理 *******

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('data=======')
  }, 2000);
})

function wrapPromise(userPromise) {
  // race 有任何一个失败了就失败  [自己造一个promise,用户promise]
  let abort
  let internalPromise = new Promise((resolve, reject) => {
    abort = reject
  })

  let racePromise = Promise.race([internalPromise, userPromise])
  racePromise.abort = abort

  return racePromise
}

p = wrapPromise(p)

setTimeout(() => {
  p.abort('超时了')
}, 3000);

// 我们可能会有一个超时逻辑，超过1s 就不采用成功的结果了
p.then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
