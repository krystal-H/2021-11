// Object.defineProperty  es5

// 通过Object.defineProperty定义属性  可以增加拦截器
let obj = { name: 'zf00' }
let obj = {}
// 空对象不可枚举  还有 函数的原型  Array.prototype
let other = ''
// 可以加参数可枚举  enumerable:true
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: true, // 能不能删除这个属性
  // writable: true, // 是否可重写  不可和get set同时存在
  // value: 'hello'
  // 使用get set可以写自己的逻辑
  get() { // 读取方法
    console.log('-----')
    return other
  },
  set(val) { // 设置方法
    other = val
  },
})
// delete obj.name
obj.name = "hcy"

console.log(obj.name)
// ---------------------------------
let obj = {
  other: '444555666',
  get name() {
    return this.other
  },
  set name(val) {
    this.other = val
  }
}
obj.name = 123
console.log(obj.name)

// 对象的setter/getter


// vue的数据劫持 （把所有的属性都改成get和set方法）
function update() { // 模拟的方法
  console.log('更新试图')
}

let data = {
  name: 'aaa',
  age: 18,
  address: {
    location: 'beijing'
  }
}

// 观察器
function observer(obj) { // Object.defineProperty只能用在对象上   数组也不识别
  if (typeof obj !== 'object') return obj
  for (let key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

// 响应式
function defineReactive(obj, key, value) {
  // console.log(value, '======')
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal != value) {
        observer(newVal)
        update()
        value = newVal
      }
    }
  })
}

observer(data)

// data.name = 'hahahaha'
// data.address.location = '深圳'

// data.address = {
//   location: '北京'
// }
// data.address.location = '123'

data.address = [1, 2, 3]
let methods = ['push', 'slice', 'pop', 'reverse', 'shift', 'unshift', 'sort']
methods.forEach(method => {
  // 面向切片开发   装饰器  在调用原有方法的基础上加上自己的逻辑
  let oldMethod = Array.prototype[method]
  Array.prototype[method] = function () {
    update()
    oldMethod.call(this, ...arguments)
  }
})

data.address.push(4)
data.address.push(4)