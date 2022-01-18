class Animal {
  static flag = 123 // es7写法 支持静态属性  
  static flag2() {
    return 456
  } // es6只支持静态方法

  constructor(name) {
    this.name = name
    this.eat = '吃肉'
  }

  say () { // 原型上的方法
    console.log('说话')
    console.log(this) // es6 规范里  如果单独调用原型上的方法  this是不存在的
  }
}

// 1) 类不能当做函数调用  只能new
// let animal = new Animal()
// console.log(animal.say)
// console.log(Animal.flag, Animal.flag2())
// 静态方法是类上的方法

class Tiger extends Animal { // 实例 + 原型
  // 内部不写constructor 内部会默认添加继承
  // 假如写了constructor 继承就要写super 传参给父类
  constructor(name) { // 相当于Animal.call(this, '老虎')
    super(name)
  }
}

let tiger = new Tiger('老虎')
console.log(tiger.name)
console.log(Tiger.flag, Tiger.flag2()) // 静态方法可以被类继承
