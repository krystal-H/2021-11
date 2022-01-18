// 需要依赖安装babel依赖包来运行

// 装饰器可以修饰类  类的属性 类的原型上的方法

// 修饰的时候  就是把这个类  属性... 传递给修饰的函数
// 不能加分号与下边一体
// @flag
@flag('哺乳类')
class Animal {
  @readOnly
  PI = 3.14;
  name = 'xxx'
  @before
  say(a, b, c) {
    console.log('说话', a, b, c, this)
  }
}

// 1) 类的静态属性
// function flag(constructor) {
//   constructor.type = "哺乳类"
// }
// console.log(Animal.type)

function flag(value) {
  return function (constructor) {
    constructor.type = value
  }
}
console.log(Animal.type)

// 2)类的属性(实例上的属性)
function readOnly(target, property, descriptor) {
  // setTimeout(() => {
  //   console.log(target == Animal.prototype)
  // })
  descriptor.writable = false // 不可更改
}

let animal = new Animal()
animal.PI = 3.15


function before(target, property, descriptor) {
  let oldSay = descriptor.value
  descriptor.value = function () {
    console.log('before')
    oldSay.call(this, ...arguments)
  }
}

animal.say(1,2,3)