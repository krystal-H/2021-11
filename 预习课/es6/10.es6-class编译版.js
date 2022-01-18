"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Animal = /*#__PURE__*/function () {
  // es7写法 支持静态属性  
  Animal.flag2 = function flag2() {
    return 456;
  } // es6只支持静态方法
  ;

  function Animal(name) {
    this.name = name;
    this.eat = '吃肉';
  }

  var _proto = Animal.prototype;

  _proto.say = function say() {
    // 原型上的方法
    console.log('说话');
    console.log(this); // es6 规范里  如果单独调用原型上的方法  this是不存在的
  };

  return Animal;
}(); // 1) 类不能当做函数调用  只能new
// let animal = new Animal()
// console.log(animal.say)
// console.log(Animal.flag, Animal.flag2())
// 静态方法是类上的方法


_defineProperty(Animal, "flag", 123);

var Tiger = /*#__PURE__*/function (_Animal) {
  _inheritsLoose(Tiger, _Animal);

  // 实例 + 原型
  // 内部不写constructor 内部会默认添加继承
  // 假如写了constructor 继承就要写super 传参给父类
  function Tiger(name) {
    // 相当于Animal.call(this, '老虎')
    return _Animal.call(this, name) || this;
  }

  return Tiger;
}(Animal);

var tiger = new Tiger('老虎');