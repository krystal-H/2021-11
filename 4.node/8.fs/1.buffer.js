// buffer 代表的就是缓存区域的内容，早期js没有读取文件的能力（前端多数都是字符串） 在node中读取出的内容都是二进制格式
// buffer优点可以将二进制和我们的字符串相互转化   buffer代表的是内存（内存地址  引用类型）  buffer默认声明的时候都是固定大小的

// 声明buffer的三种方式

// 1
const buffer = Buffer.from('珠峰') // node中默认不支持gbk编码(在utf8中一个汉字是三个字节)
console.log(buffer.toString('base64')) // 可以将buffer转成对应的编码  utf8/base64

// 2
const b1 = Buffer.alloc(6) // buffer中的单位都是字节(最小单位)
console.log('b1----', b1)

// 3
const b2 = Buffer.from([0x64, 100, 'abc', 257]) // 这种方式基本用不到
console.log(b2)

// 编码  ascii -> gb18030 -> gbk ->  unicode -> utf8
console.log(Buffer.from('abc')) // 字符串是一个字符一个字节  应用的是ASCII

// 我们要掌握buffer的常用方法和基本的api
// 将多个buffer拼在一起******************************
const b4 = Buffer.from('珠峰')
const b5 = Buffer.from('架构') // 扩容处理  （就是声明一个更大的将以前的放进去）copy

const bigBuffer = Buffer.alloc(b4.length + b5.length) //取得是字节长度
console.log(bigBuffer)

// copy实现原理
/**
 * 
 * @param {*} target 目标buffer
 * @param {*} targetStart copy到目标的哪个位置
 * @param {*} sourceStart 从源的哪里开始拷贝
 * @param {*} sourceEnd 到源的哪里结束拷贝
 */
Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
  console.log('调用copy')
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    target[targetStart + i] = this[sourceStart + i] // buffer存放的都是引用类型
  }
}

b4.copy(bigBuffer, 0) // npm install @types/node   (node中的ts的声明文件)
b5.copy(bigBuffer, 6)

console.log(bigBuffer)
console.log(bigBuffer.toString())


// 一般不用上边的方法拼接buffer****************使用concat**************

// 实现原理
Buffer.concat = function (list, totalLength = list.reduce((memo, current) => memo += current.length, 0)) {
  const bigBuffer = Buffer.alloc(totalLength)
  let pos = 0
  list.forEach(buf => {
    buf.copy(bigBuffer, pos)
    pos += buf.length
  })
  return bigBuffer
}

let bigbuffer = Buffer.concat([b4, b5])
console.log(bigbuffer, '----bigbuffer')


// Buffer.concat()  Buffer.slice()  我们事先声明了一个100字节的buffer 但是最终只有10个有效，我们可以截取出来
// Buffer.isBuffer() 可以判断是不是buffer类型  我们可以统一将数据全部处理成buffer来进行操作
// Buffer.indexOf()  可以基于封装split方法

// 如果自己分析数据，行读取器 每读取一行就打印一下，遇到关键字就处理

let buf = Buffer.from('1---哈哈---哦哦---123---name=hcy')
// let idx = buf.indexOf('---') // 字符串的indexOf
// console.log(idx)

Buffer.prototype.split = function (sep) {
  sep = Buffer.isBuffer(sep) ? sep : Buffer.from(sep)
  let len = sep.length // 是对应分隔符的长度  是以默认字节位单位的
  let arr = []
  let offset = 0
  let idx = 0
  // this的indexOf（buffer）
  while (-1 != (idx = this.indexOf(sep, offset))) {
    arr.push(this.slice(offset, idx))
    offset = idx + len
  }
  arr.push(this.slice(offset))
  return arr
}

let idx = buf.split('---')
console.log(idx)




// // 和数组来类比buffer  slice()截取
// let arr = [[1],2,3,4,5]
// const newArr = arr.slice(0,1) // 截取的是内存空间
// newArr[0][0] = 100
// console.log(arr)

// let b7 = Buffer.from([1, 2, 3, 4, 5, 6])
// console.log('b7----', b7)
// let b8 = b7.slice(0, 1) // 截取的是内存空间，引用类型
// b8[0] = 100
// console.log('b7----', b7)
