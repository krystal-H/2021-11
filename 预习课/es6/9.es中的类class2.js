// es6 类   es5构造函数

// 2)类的继承

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
Tiger.prototype.say = function () {
  console.log('说话')
}

// 1.继承父类实例上的属性
let tiger = new Tiger()
// console.log(tiger.eat, '----') // 通过Animal.call(this) 可以使Tiger继承Animal,从而获取父类实例上的属性


// 2.继承父类的公共属性、方法  即prototype上挂载的
Tiger.prototype = Animal.prototype   // 不可这样使用，不然就成公用了，违背父子类继承关系

console.log(tiger.address)


