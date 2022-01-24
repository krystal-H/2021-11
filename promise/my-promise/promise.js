const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
      if (this.status === FULFILLED) {
        let x = onFulfilled(this.value)
        resolve(x)
      }
      if (this.status === REJECTED) {
        let x = onRejected(this.reason)
        // 失败进入当前then的reject，下一个then的成功
        resolve(x)
      }
      if (this.status === PENDING) {
        // 发布订阅  有可能调then的时候没成功也没失败，我就将回调存起来，稍后根据用户调用的方法再进行执行
        this.onFulfilledCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolve(x)
        })
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason)
          resolve(x)
        })
      }
    })
    return p1
  }
}

module.exports = Promise
