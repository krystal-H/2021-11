// 基于文件的可读流

const fs = require('fs')
const path = require('path')

// flags ?: string | undefined;
// encoding ?: BufferEncoding | undefined;
// fd ?: number | promises.FileHandle | undefined;
// mode ?: number | undefined;
// autoClose ?: boolean | undefined;
// /**
//  * @default false
//  */
// emitClose ?: boolean | undefined;
// start ?: number | undefined;
// highWaterMark ?: number | undefined;

let rs = fs.createReadStream(path.resolve(__dirname, 'test'), {
  flags: 'r', // 默认就是r表示读取操作
  encoding: null, // 默认读取出的数据是二进制格式
  // mode: 438 // 读写模式  操作权限
  emitClose: true, // 读取完毕后是否触发close事件
  start: 0, // 从哪里开始读取
  end: 3, // 读取到什么位置
  highWaterMark: 2, // 每次读取文件的字节数64*1024
})

// 自己的权限  我所在组的权限  别人的权限  chmod -R 777
// rwxr-xr-x 权限 r 4 w 2 x 1 666

rs.on('open', function (fd) {
  console.log(fd)
})

// 如果用户监听了data事件  会将数据不停的发射出来
let arr = []
rs.on('data', function (data) {
  // rs.pause() // 这个暂停意味着不再触发 data事件
  console.log(data)
  arr.push(data)
})

rs.on('end',function () {
  console.log('读取完毕了')
  console.log(Buffer.concat(arr).toString())
})

rs.on('error', function (err) {
  console.log(err)
})

// 文件的可读流才具有close事件
rs.on('close', function () {
  console.log('close')
})


// setTimeout(() => {
//   rs.resume() // 恢复data的触发
// }, 1000);


// on('open') on('close') on('data') on('end') on('error') on('close')

