// Function Expression
// const square = function(num){
//     return num*num;
// }

// console.log(square(5));

// First class function
// function square(num){
//     return num*num;
// }

// function display(fn){
//     console.log("square is" + fn(5));
// }

// display(square)

// (function IIFEE(num){
//     console.log(num);
// })(5);

// (function (x) {
//   return (function (y) {
//     console.log(x);
//     console.log(y);
//   })(2);
// })(1);

// // Function Scope output based questions
// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

// Hoisting

funcName(x);
function funcName(a) {
  console.log("Worktech", a);
}

var x = 5;
