// Currying
// function f(a) {
//   return function (b) {
//     console.log(a, b);
//   };
// }
// f(2)(5);

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(2)(4)(1))
