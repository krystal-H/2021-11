// set map  两种存储解构

// set  集合  不能重复的东西,放了就白放了

let s = new Set([1, 2, 2])
console.log(typeof s) // 基本类型  string number boolean undedined null Symbol

// s.add('123')
// s.delete('123') // 添加和删除  并且没有顺序
// console.log(s.values(), 'values')
// console.log(s.keys(), 'keys')
// console.log(s.entries()) // 可以把一个对象的键值以数组的形式遍历出来

// let arr = [...s]
// console.log(arr)


// 集合  并集  交集  差集
let s01 = [1, 2, 3,1, 2, 3,7]
let s02 = [3, 4, 5,1, 2]
// 并集
function union() {
  let s1 = new Set(s01)
  let s2 = new Set(s02)
  return [...new Set([...s1, ...s2])]
}
console.log(union())

// 交集
function intersection() {
  return [...new Set(s01)].filter(item => new Set(s02).has(item))
}
console.log(intersection())

// 差集
function diff() {
  return [...new Set(s01)].filter(item => !new Set(s02).has(item))
}

console.log(diff())

