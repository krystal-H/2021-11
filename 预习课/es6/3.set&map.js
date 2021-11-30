// set map  两种存储解构

// set集合  不能重复的东西,放了就白放了

let s = new Set([1, 2, 2,3])
console.log(typeof s, '-----type') // 基本类型  string number boolean undedined null Symbol

s.add('123')
s.delete('123') // 添加和删除  并且没有顺序
console.log(s.values(), 'values')
console.log(s.keys(), 'keys')
console.log(s.entries()) // 可以把一个对象的键值以数组的形式遍历出来

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

// ------------------------------------

// map是有key的  不能放重复的
let m = new Map()
// m.set('name', 'zf')
let obj = {name: 1}
m.set(obj, '456') // 这个obj的引用空间被set所引用
obj = null // 把obj清空  这个空间还是存在的
console.log(m)


// 假如换成   let m = new WeakMap()   obj可以被清空的
// WeakMap的key必须是对象类型  
// WeakMap 弱链接

