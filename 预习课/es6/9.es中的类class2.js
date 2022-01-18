// es6 类   es5构造函数

// 2) 类的继承----------------

// 父类
function Animal(name) {
  this.name = name
  this.eat = '吃肉'
}
Animal.prototype.address = { location: '山里' }

// 子类
function Tiger(name) {
  this.name = name
  this.age = 10
  Animal.call(this)
}

// 2.继承父类的公共属性、方法  即prototype上挂载的
// Tiger.prototype = Animal.prototype   // 不可这样使用，不然就成公用了，违背父子类继承关系(可以相互访问)

// 可以使用方法1*****
// Tiger.prototype.__proto__ = Animal.prototype // ie低版本没有__proto__
// 等价方法  setPrototypeOf
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype)

// 可以使用方法2*****
// //  Object.create es5的方法   实现原理
// function create(parentPrototype) {
//   let Fn = function(){}
//   Fn.prototype = parentPrototype
//   // 为了保证tiger.constructor指向Tiger
//   let fn = new Fn()
//   fn.constructor = Tiger
//   return fn // 当前实例可以拿到animal.prototype
// }
Tiger.prototype = Object.create(Animal.prototype, {constructor: {value: Tiger}})

Tiger.prototype.say = function () {
  console.log('说话')
}

// 1.继承父类  实例上的属性
let tiger = new Tiger()
// console.log(tiger.eat, '----') // 通过Animal.call(this) 可以使Tiger继承Animal,从而获取父类实例上的属性

console.log(tiger.address)
console.log(tiger.constructor)
// new Animal().say()


