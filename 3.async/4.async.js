
const fs = require('fs').promises; // 这里拿到的所有fs都是promise方法
const path = require('path')

// async + await = generator + co 来实现的
async function read() {
  try {
    let filename = await fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8')
    let content = await fs.readFile(path.resolve(__dirname, filename), 'utf8')
    return content
  } catch (error) {
    console.log('err---', error)
  }
}

// async函数默认执行后就会返回一个promise，内部支持trycatch
// 内部有trycatch  就不再向下抛错
read().then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})

// 实现原理  ./source.js