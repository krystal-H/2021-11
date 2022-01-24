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
  then(onFulfilled, onRejected) { // 调用then的时候会判断是成功还是失败
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}

module.exports = Promise
