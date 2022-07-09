
// 文件读取等操作  都是操作的二进制数据  fs filesystem
// fs.readFileSync()  同步性能（缺陷是阻塞主线程）  fs.readFile() （异步的非阻塞）
// fs.writeFileSync()                            fs.writeFile()
// 默我们再做一些前置工作的时候（前置工作采用同步的） 在程序运行的过程中为了防止阻塞主线程（需要采用异步）


const fs = require('fs')
const path = require('path')

// 拷贝一个文件
// 写入的特点是：如果文件不存在会创建这个文件，如果文件存在，默认会清空文件（最后写入）
// 读取的特点是：如果文件不存在会报错

// 简单的文件读取是ok的  但是如果文件大的话不能采用这种方式    流（采用边读写边写入的方式，暂停，控制速率的功能）
// fs.readFile(path.join(__dirname, 'package.json'), function (err, data) {
//   if (err) return err
//   fs.writeFile(path.join(__dirname, 'package1.json'), data, function (err) {
//     console.log(err, '写入的data')
//   })
// })

// fs.open()   fs.read()  fs.write()  fs.close()  也有同步的但是主要应用还是异步api

// 64位以下的可以采用这种方式
// r 读取  w写入  a追加

// 所有的读取  都是写入 （是把文件中的内容，写入到内存中）
// const BUFFERSIZE = 3
// const buffer = Buffer.alloc(BUFFERSIZE)
// fs.open(path.resolve(__dirname, 'test'), 'r', function (err, fd) { // file descriptor 文件描述（描述如何操作这个文件）

//   // 将数据写入到buffer中，从第0个索引开始写入，写入三个，从哪个位置开始读取
//   fs.read(fd, buffer, 0, BUFFERSIZE, 0, function (err, bytesRead) { // byteRead 真实读取到的个数
//     // console.log(bytesRead, buffer.toString())
//     fs.open(path.resolve(__dirname, 'test1'), 'w', function (err, wfd) {
//       fs.write(wfd, buffer, 0, bytesRead, 1, function (err, written) { // witten 真正写入的个数
//         console.log(written)
//       })
//     })
//   })
// })

function copy(source, target, cb) {
  const BUFFERSIZE = 3
  const buffer = Buffer.alloc(BUFFERSIZE)
  fs.open(path.resolve(__dirname, 'test'), 'r', function (err, fd) {
    fs.open(path.resolve(__dirname, 'test1'), 'w', function (err, wfd) {
      if (err) return cb(err)
      let readOffset = 0
      let writeOffset = 0
      function next() {
        fs.read(fd, buffer, 0, BUFFERSIZE, readOffset, function (err, bytesRead) {
          if (err) return cb(err)
          if (bytesRead == 0) {
            console.log('copy完整')
            fs.close(fd, function () { })
            fs.close(wfd, function () { })
            return
          }
          fs.write(wfd, buffer, 0, bytesRead, writeOffset, function (err, written) {
            if (err) return cb(err)
            console.log(written)
            readOffset += written
            writeOffset = readOffset
            next()
          })
        })
      }
      next()
    })
  })
}

copy()

// 问题 ——回调地狱  出错了不能统一处理   没发控制暂停  读写没有分离  读写的打开顺序(不应该有顺序)

// 利用发布订阅来解耦
