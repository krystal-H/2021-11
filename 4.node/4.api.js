// 1.  core.js的版本

// node中常用的模块分为三种  
// 1.内置模块 核心模块（不需要安装直接能用node自带的）
// 2.文件模块（require('./promise')） 自己写的文件自己使用  引用的时候有相对路径或者绝对路径
// 3.第三方模块  别人系的好的用的时候先下载再使用，使用方式和内置模块一样


// fs path vm 

const fs = require('fs')  // 内部一般两种api  同步/异步

// require就是一个读取文件的操作

// 在读取文件之前 目录可能不存在
let exists = fs.existsSync('./note.md') // 判断文件是否存在
console.log(exists)
if (exists) {
  let data = fs.readFileSync('./note.md', 'utf-8') // 同步会阻塞，但是当代码执行前，我都可以采用同步的方式
}

let path = require('path') // 路径处理模块
console.log(path.join('a', '//b', 'c', '..'))
console.log(path.resolve('a', '//b', 'c', '..')) // 它也具备拼接的功能，但是最终拼接出来的是一个绝对路径
// path.resolve遇到 / 表示的是根路径，默认以当前路径process.cwd()解析成绝对路径

console.log(path.basename('a.js')) // 
console.log(path.extname('a.js')) // .js 取最后一个后缀名作为结果
console.log(path.relative('a/b/c', 'c')) // 获取当前的相对路径
console.log(path.dirname(__filename)) // === __dirname 内部__dirname就是这样产生的

const vm = require('vm') // 开发时基本用不到  可以让一个字符串执行
// 1.eval 执行的时候会采用上级的变量
// eval('console.log(fs)')
// 2.newFunction 
// global.c = 100
// const sum = new Function('a','b','return a+b+c')
// console.log(sum(1,2))
// 1和2可能受外界因素的影响不安全

global.a = 100
vm.runInNewContext('console.log(a)') // 沙箱执行，实现一个全新的上下文

// js如何实现沙箱机制  尝试实现一下  快照  Proxy
// 支持Proxy的浏览器使用代理沙箱，不支持的浏览器降级使用快照沙箱
// 两种沙箱均具备相同的使用方式：卸载应用时，使沙箱失活；挂载应用时，使沙箱激活
