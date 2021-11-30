// 箭头函数  没有this  没有arguments

function a() {

}

// let a = function (x, y) {
//   return { total: x + y }
// }

// a(1, 2)

// let a = (x, y) => ({ total: x + y })



// let a = function (x) {
//   return function (y) {
//     return x + y
//   }
// }

// a(1, 2)
// let a = x => y => x+y



// this的问题   看.前边是谁  this就是谁
let a = 1
// let obj = {
//   a:2,
//   fn() {
//     console.log(this.a)
//     setTimeout(function () {
//       console.log(this.a)
//     })
//   }
// }
let obj = { // 对象  非作用域
  a: 2,
  fn: () => { // 箭头函数向上找
    console.log(this.a)
    setTimeout(() => { // 箭头函数向上找
      console.log(this.a)
    })
  }
}

obj.fn()

// 全局作用域
// 函数作用域
// {
//   let
// }