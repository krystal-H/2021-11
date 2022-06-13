
// node中为了实现i/o操作  自己实现了一个libuv（事件环的概念）-》异步操作  靠的多线程
// console.log(this) //{}  服务段全局变量原则是global，但是node在执行的时候为了实现模块化。
// 会在执行代码时，外部包装一个函数，这个函数在执行的时候会改变this指向

// console.log(global) // 浏览器中是window 

// Buffer  process  __dirname __filename exports module require
// console.log(__dirname,__filename,exports,module,require)
// 后边五个属性  都可以直接访问在文件中，但是不能通过global来获取global.__dirname

// process******************************
// console.log(Object.keys(process))

// platform  windows->win32  mac->darwin
console.log(process.platform) // 识别系统
// cwd current working directory 在哪执行的这个文件
console.log(process.cwd()) // 获取执行命令时的路径  
console.log(__filename) // 代表的是文件所在位置  是一个绝对路径
console.log(__dirname) // 文件所在的目录  是一个绝对路径
// env 环境变量  默认代码在执行的时候会去查找电脑的环境
console.log(process.env.NODE_ENV) // 在执行命令的时候 （添加的变量） 可以去读取环境变量中的属性
// window下可以使用set命令来设置  mac使用export  -》 cross-env  窗口关掉就消失了

let requestUrl = ''
if (process.env.NODE_ENV === 'development') {
  requestUrl = 'http://localhost'
} else {
  requestUrl = 'http://12.1211.6'
}

// argv
// console.log(process.argv) // 执行命令时所带的参数  1.代表的是可执行node.exe  2.执行的是哪个文件
console.log(process.argv.slice(2)) // 终端执行  node 3.core.js --port 3000 --config .env
// 终端执行
let args = process.argv.slice(2)
let userArgs = args.reduce((memo, current, index,arr) => {
  if (current.includes('--')) {
    memo[current.slice(2)] = arr[index+1] || true
  }
  return memo
},{})
console.log(userArgs)


// https://www.npmjs.com/package/commander
// commander命令行管家  第三方模块用的时候需要下载
// const commander = require('commander')
// const { program } = require('commander')
// program.version('0.0.1')
// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .command('run').action(() => {
//     console.log('run');
//   })

// program.parse(process.argv)

// const options = program.opts();
// console.log(options)

// nextTick
process.nextTick(() => { // 异步的，把他叫成微任务  不属于事件环的一部分   下一队列，本轮任务执行完毕后会立即执行
  console.log('nextTick')
})

Promise.resolve().then(() => { // promise也不属于node中的事件环
  console.log('promise')
})

// node里会先执行process.nextTick

// node中自己实现了一个事件环机制（新版本的node执行结果和浏览器执行的结果一样）底层实现的方式不一样
// 对于浏览器而言 宏任务只有一个队列，对于node而言  setImmediate/setTimeout    创造了多个宏任务队列


// 如果在i/o操作中下一个事件队列要执行的是check, 所以setImmediate 优先级高于setTimeout
require('fs').readFile('./node.md', () => {
  setTimeout(() => {
    console.log('setTimeout')
  })
  setImmediate(() => {
    console.log('setImmediate')
  })
})

// node和浏览器事件环的差异  浏览器1个队列  node多个队列
// 执行顺序都是   先执行代码-》（node会清空nextTick）-》清空微任务-》再取出一个和宏任务来执行，
// 当达到poll阶段后，如果check阶段为空，而且poll里面也没有io操作，此时不会继续轮询，
// 会等待定时器到达事件，重新执行或者有新的i/o操作进入到poll阶段
