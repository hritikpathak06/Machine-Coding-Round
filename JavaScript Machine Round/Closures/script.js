// var name = "sdhsjhdjshdjsjds"
// function local(){
//    console.log(name)
// }

// local();

// function subscribe() {
//   const name = "Ritik Kumar Pathak";
//   function displayName() {
//     console.log(name);
//   }
//   displayName();
// }

// subscribe();

// var username = "Ritik"

// function makeFunc() {
//   const name = "Mozilla";
//   function displayName(x) {
//     console.log(name,x,username);
//   }
//   return displayName;
// }

// const myFunc = makeFunc();
// myFunc(5);


// Closure scope chain
// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20
