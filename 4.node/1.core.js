


// 1) 要读取文件内容
// 2）包装函数
// 3）默认返回module.exports

// let str = (function (module) {
//  // 可以传参数module={} 即可导出module.exports
//   let str = 'hello word'
//   module.exports = str

//   return module.exports
// })({})

// let str = require('./test.js')
// console.log(str)

// console.log(arguments)
// console.log(this)

const path = require('path') // 处理路径

// join/resolve 用的时候可以混用
// console.log(path.join('a','b', 'c', '..', '/'))

// // 根据已有的路径来解析绝对路径，可以用它来解析配置文件
// console.log(path.resolve('a','b', '/')) // resolve不支持 /  会解析成根路径

// console.log(__dirname) // 当前文件的绝对路径
// console.log(path.resolve(__dirname, 'a')) // 拼路径===
// console.log(path.join(__dirname, 'a')) // 拼路径===

// console.log(path.extname('1.js')) // 返回文件扩展名
// console.log(path.dirname(__dirname)) // 解析父目录


const fs = require('fs') // file system
// 同步读取
const content = fs.readFileSync(path.resolve(__dirname, './test.js'), 'utf-8')
// console.log(content)

let flag = fs.existsSync(path.resolve(__dirname, './test.js'))
console.log(flag)


// 想让字符串执行  不能采用eval,会有上下文依赖问题，
// let str = '123'
// eval(`console.log(str)`) 

// **************
// new Function可以创造一个顶级的函数，也没有上下文的问题，但是node中没有使用它
// 由 Function 构造函数创建的函数不会创建当前环境的闭包，
// 它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，
// 不能访问它们被 Function 构造函数创建时所在的作用域的变量。
var x = 10;
function createFunction1() {
    var x = 20;
    return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
}
var f1 = createFunction1();
console.log(f1())

// 虽然这段代码可以在浏览器中正常运行，
// 但在 Node.js 中 f1() 会产生一个“找不到变量 x”的 ReferenceError。
// 这是因为在 Node 中顶级作用域不是全局作用域，而 x 其实是在当前模块的作用域之中。
// **************

// node中使用的模块
const vm = require('vm')

let a = 1
const result = vm.runInThisContext("a=10") // 沙箱，独立的环境
console.log(a, result)

const result2 = eval("a=999")
console.log(a, result2)
