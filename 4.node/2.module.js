const path = require('path')
const fs = require('fs')
const vm = require('vm')
function Module(id, exports = {}) {
  this.id = id
  this.exports = exports
}

Module._extensions = {
  '.js'(module) {
    const content = fs.readFileSync(module.id, 'utf-8')
    // 取出来的内容包裹成一个函数
    let wrapperFn = vm.compileFunction(content, [
      'exports', 'require', 'module', '__filename', '__dirname'
    ])
    // console.log(wrapperFn.toString())
    let exports = this.exports
    let thisValue = exports
    let require = req
    let filename = module.id
    let dirname = path.dirname(filename)
    // wrapperFn.apply()
    // 让方法执行
    Reflect.apply(wrapperFn, thisValue, [exports, require, module, filename, dirname])
  },
  '.json'() {

  }
}

Module._resolveFilename = function (id) {
  const filepath = path.resolve(id)
  // 当前文件中存在此文件路径id,直接返回
  if (fs.existsSync(filepath)) return filepath

  // 不存在就给文件尝试添加后缀
  const exts = Object.keys(Module._extensions)
  for (let i = 0; i < exts.length; i++) {
    let file = filepath + exts[i]
    if (fs.existsSync(file)) return file
  }
  throw new Error('Cannot find module' + id)
}

Module.prototype.load = function (filename) {
  let ext = path.extname(filename)
  Module._extensions[ext](this) // 取到对应的扩展名去执行
}

function req(id) {
  let absPath = Module._resolveFilename(id)
  const module = new Module(absPath)
  module.load(absPath) // 加载文件

  return module.exports
}


let str = req('./test')
// let str = require('./test')
console.log(str)

// 怎么调试代码，vscode
// 添加launch.js文件 并且取消忽略源代码
// 知道调试的文件，在对应的地方打断点

// 看源码先掌握核心思路  之后再写个mini版

// 1) require 一个模块 默认会调用Module._load方法
// 2) Module._resolveFilename 解析文件名 默认会自动添加.js .json  要文件名的目的就是为了能读取
// 3) 创建当前模块的实例 const module = new Module() => {id: 文件名, exports: {}}
// 4) module.load根据刚才得到的文件名来进行模块的加载
//        5) 根据文件的后缀调用注册的方法（策略模式）
//        6) 加载js文件，读取文件的内容
//        7) module._compile 给读取到的内容包装函数 vm.compileFunction()
// 参数有'exports', 'require', 'module', '__filename', '__dirname',
// 8) 就是执行这个函数将module传递给用户（用户会手动的给module.exports赋值）

// 9) 最终返回的就是   module.exports