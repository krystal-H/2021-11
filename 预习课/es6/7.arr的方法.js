// 数组的方法  
// es5  forEach reduce map filter some every
// es6 find findIndex
// es7 includes


// reduce  收敛
// 1. -------求和

const arr = [1, 2, 3, 4]
const result = arr.reduce((a, b) => {
  return a + b
})

console.log(result)

const arr1 = [{ price: 100, count: 1 }, { price: 200, count: 2 }, { price: 300, count: 3 }]
const r = arr1.reduce((a, b) => {
  return a + b.price * b.count
}, 0)

console.log(r)

// 2. -------reduce常见的功能  多个数据  最终变成了一个数据
let keys = ['name', 'age']
let values = ['hc', 18]
let obj = keys.reduce((memo, current, index) => {
  memo[current] = values[index]
  return memo
}, {})

// 简写(阅读性不高，看着高大上)
// (1,2,3,4)  返回最后一个值
// (memo[current] = values[index], memo)  相当于最后return memo
// let obj = keys.reduce((memo, current, index) => (memo[current] = values[index], memo), {})
console.log(obj) // => {name: 'hc', age:18}


// 3. reduce-------redux  compose方法
function sum(a, b) {
  return a + b
}

function toUpper(str) {
  return str.toUpperCase()
}

function add(str) {
  return '***' + str + '***'
}

// console.log(add(toUpper(sum('wa', 'haha'))))

// 想写个组合方法代替上边的调用，易扩展
// 倒着调用reduceRight
// function compose(...fns) { // 直接返回一个函数
//   return function (...args) {
//     let lastFn = fns.pop()
//     return fns.reduceRight((a, b) => {
//       return b(a)
//     }, lastFn(...args))
//   }
// }

// 正着调用reduce
function compose(...fns) { // 通过reduce返回一个函数
  return fns.reduce((a, b) => { // toUpper(sum('wa', 'haha'))类比
    return (...args) => {
      return a(b(...args))
    }
  })
}

// 等价写法
// let compose = (...fns) => fns.reduce((a,b) => (...args) => a(b(...args)))

let r = compose(add, toUpper, sum)('wa', 'hahah')
console.log(r)


// 4.-------平均数  求幂
Array.prototype.reduce = function (callback, pre) {
  // this = [1,2,3]
  for (let i = 0; i < this.length; i++) {
    if (pre == undefined) {
      // this[i] = 1  this[i+1] = 2
      pre = callback(this[i], this[i + 1], i + 1, this)
      i++
    } else {
      pre = callback(pre, this[i], i, this)
    }
  }

  return pre
}


let r = [1, 2, 3].reduce((a, b, index, current) => {
  console.log(index)
  return a + b
}, 100)

console.log(r)



// 5. ------map filter some every
let newArr = [1,2,3].map(item => item*2)
[1,2,3].filter(item => item != 2)
