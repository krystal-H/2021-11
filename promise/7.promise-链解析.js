
const fs = require('fs')
const path = require('path')

const Promise = require('./my-promise/promise')

let p1 = new Promise((resolve, reject) => {
  // resolve(100)
  // reject('失败')
  setTimeout(() => {
    // resolve(100)
    reject('reject')
  }, 1000);
}).then(data => {
  return data
}, err => {
  return err
})

p1.then(data => {
  console.log(data,'00000')
})

