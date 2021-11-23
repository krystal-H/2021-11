// var 要求全部改用 let const

// 1) var 声明变量  污染全局变量
var a = 1
console.log(window.a)

// 2) var导致变量提升的问题  function也有变量提升
console.log(a)
let a = 1

// 3) var可以被重复声明  let可以解决重复定义的问题
let a = 1
let a = 2

// 4) var作用域的问题 常见的作用域  全局作用域  函数作用域
// {
//   let a = 1
// }
// console.log(a)

let a = 100
{ // a有声明在当前作用域下
  console.log(a) // 暂存死区
  let a = 200
}

for(var i = 0; i<10; i++) { // var let
  setTimeout(function() {
    console.log(i)
  })
}

// const 常量  不会变的量
const PI = 3.14
PI = 3.15


// 地址不变可修改如下  在这个空间内该值不会影响
const PI = { r: 5 }
PI.r = 6

