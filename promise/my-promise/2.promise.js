const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise, x, resolve, reject) {
  // console.log(promise)
  // 核心——用x的值来决定promise 走resolve还是reject
  // 我们要考虑不同人写的promise可以互相兼容，所以这里要按照规范来实现，保证promise直接可以互相调用
  // 判断x是不是一个promise 是promise就采用他的状态，如果解析后还是promise会递归解析
  if (promise == x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  // 判断x是不是一个promise   如果不是promise,则直接用这个值将promise变成成功态即可
  if (typeof x === 'object' && x != null || typeof x === 'function') {
    try {
      let then = x.then // 这个x可能是通过defineProperty定义的then
      if (typeof then === 'function') {// 这已经最小判断
        then.call(x, y => { // 如果x是一个promise就用他的状态来决定
          resolvePromise(promise, y, resolve, reject) // 递归解析y的值
        }, r => { // 一旦失败了,就不在解析失败的结果了  不论r里边是不是promise
          reject(r)
        })
      } else {
        // {} / function 没有then方法  依旧是普通值 
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {// x不是对象或函数  普通值
    resolve(x)
  }

}

class Promise {
  constructor(executor) {
    this.status = PENDING // promise的默认状态
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因
    this.onFulfilledCallbacks = [] // 所有成功的回调，为了存储异步执行
    this.onRejectedCallbacks = [] // 所有失败的回调，为了存储异步执行

    const resolve = (value) => { // 更改状态的方法  resolve
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onFulfilledCallbacks.forEach(cb => cb(this.value))
      }
    }
    const reject = (reason) => {// 更改状态的方法  reject
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(cb => cb(this.reason))
      }
    }
    try {
      executor(resolve, reject) // executor就是执行器立刻执行，出错就调用reject
    } catch (e) {
      reject(e)
    }
  }
  // then返回一个promise才可以继续 .then
  then(onFulfilled, onRejected) { // 调用then的时候会判断是成功还是失败
    // 可以不停的then下去
    let p1 = new Promise((resolve, reject) => {
      // x是个普通值时，则将这个值直接传入到resolve中即可
      if (this.status === FULFILLED) {
        // 使用setTimeout为了resolvePromise方法可以取到p1  规范中提及
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(p1, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(p1, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      }
      if (this.status === PENDING) {
        // 发布订阅  有可能调then的时候没成功也没失败，我就将回调存起来，稍后根据用户调用的方法再进行执行
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(p1, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p1, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return p1
  }
}

module.exports = Promise
