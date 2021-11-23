// ... 展开运算符

// 合并数组  合并对象

// let arr1 = [1,2,3]
// let arr2 = [4,5,6]
// let arr3 = [...arr1, ...arr2]
// console.log(arr3)

let school = {name: 'cy'}
let my = {age: {count:18}} // 对象存在 堆里  栈中保存了对象的引用地址
let all = {...school, ...my}
my.age.count = 100
console.log(all)