// ... 展开运算符

// 合并数组  合并对象

// let arr1 = [1,2,3]
// let arr2 = [4,5,6]
// let arr3 = [...arr1, ...arr2]
// console.log(arr3)

let school = { name: 'cy' }
let my = { age: { count: 18 } } // 对象存在 堆里  栈中保存了对象的引用地址
// let all = {...school, ...my}
// my.age.count = 100
// console.log(all)
let all = JSON.parse(JSON.stringify({ ...school, ...my }))
my.age.count = 100
console.log(all)

// JSON.parse(JSON.stringify())有局限性   假如function   undefined拷贝不出来
// let school = {name: 'cy', fn:function(){}, aa:undefined, b:null}


// 自己实现深拷贝（递归拷贝  要一层层的拷贝）
// 掌握类型判断  typeof  instanceof  Object.prototype.toString.call  constructor
function deepClone(obj, hashWeakmap = new WeakMap()) {
  if (obj == null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj

  if (hashWeakmap.has(obj)) return hashWeakmap.get(obj) // 如果weakmap中有对象就直接返回   循环引用的问题

  // 数组/对象
  let cloneObj = new obj.constructor
  // 如果是对象把他放在weakmap中，如果再拷贝这个对象时这个对象就存在了，直接返回这个对象即可
  hashWeakmap.set(obj, cloneObj)
  for (let key in obj) { // 实现深拷贝
    if (obj.hasOwnProperty(key)) {//自身私有属性，不包含从原型链上继承的属性
      // 如果赋予的值是对象  我就把这个对象放在weakmap中
      cloneObj[key] = deepClone(obj[key], hashWeakmap)
    }
  }
  return cloneObj
}

let obj = { age: { name: 'cc'}}
obj.xxx = obj // 循环引用的问题           map weakmap set 集合  map映射表
const result = deepClone(obj)
obj.age.name = 'hhh'
console.log(result, '----', obj)