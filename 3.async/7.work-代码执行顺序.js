// 宏任务、微任务执行顺序

console.log(1);
async function async() { // async + await = generator + co
  console.log(2);
  await console.log(3); // yield fn()  Promise.resolve(fn()).then(() => console.log(4))
  console.log(4)
}
setTimeout(() => {
  console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
  console.log(6);
  resolve(7)
})
promise.then(res => {
  console.log(res)
})
async(); // 调用函数内部立刻执行
console.log(8);

    // 1 6 8 7 2 5 3 4  x


    // 微任务：[7,4]
    // 宏任务：[5]

    // 立即执行：1 6 2 3 8 7 4 5