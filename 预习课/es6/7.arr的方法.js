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
// let obj = keys.reduce((memo, current, index) => {
//   memo[current] = values[index]
//   return memo
// }, {})

// 简写(阅读性不高，看着高大上)
// (1,2,3,4)  返回最后一个值
// (memo[current] = values[index], memo)  相当于最后return memo
let obj = keys.reduce((memo, current, index) => (memo[current] = values[index], memo), {})
console.log(obj) // => {name: 'hc', age:18}


// reduce-------redux  compose方法
function sum(a, b) {
  return a + b
}

function toUpper(str) {
  return str.toUpperCase()
}

function add(str) {
  return '***' + str + '***'
}

compose()




