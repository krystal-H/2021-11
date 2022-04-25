function* read() {
  let a = yield 'vue';
  console.log(a)
  let b = yield 'react';
  console.log(b)
  let c = yield 'node';
  console.log(c)
  return '123';
}