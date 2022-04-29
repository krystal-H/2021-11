// es6 类   es5构造函数

// 1) 了解构造函数的属性----------------
function Animal(name) {
  // 属性  分两种  实例上的属性  公有属性(prototype)
  this.name = name
  this.arr = [1,2,3]
}

Animal.prototype.address = { location: '山里' }

let a1 = new Animal('猴子')
let a2 = new Animal('小鸡')

console.log(a1.arr === a2.arr)
console.log(a1.address === a2.address)
console.log(a1.constructor === Animal)
// 每个实例都有一个__proto__指向所属类的原型
console.log(a1.__proto__ === Animal.prototype)
console.log(a1.__proto__.__proto__ === Object.prototype)

console.log(Animal.__proto__ === Function.prototype)
console.log(Animal.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)

