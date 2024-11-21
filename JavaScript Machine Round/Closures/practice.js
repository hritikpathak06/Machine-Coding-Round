let count = 0;
function printCount() {
  if (count == 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
}
printCount();

******************************************
function createBase(num) {
  return function (innerNum) {
    console.log(innerNum + num);
  };
}

var addSix = createBase(6);
addSix(10);
addSix(21);

function find(index) {
  let a = [];
  for (let i = 0; i < 10000; i++) {
    a[i] = i * 1;
  }
  console.log(a[index]);
}

console.time("6")
find(6)
console.timeEnd("6")

console.time("33")
find(33)
console.timeEnd("33")

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 2000);
  }
}

a();

function counter() {
  var _counter = 0;

  function add(increment) {
    return (_counter += increment);
  }
  function substract(decrement) {
    return "counter ===> " + _counter;
  }
  return {
    add,
    substract,
  };
}

const c = counter();
console.log(c.add(5));
console.log(c.add(10));
console.log(c.substract(3));

// Memoize or cahening

function memoize(fn, context) {
  let res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      return (res[argsCache] = fn.call(context || this, ...args));
    }
    return res[argsCache];
  };
}

const clumsySquare = (num1, num2) => {
  for (let i = 0; i < 10000000; i++) {}
  return num1 + num2;
};

const memoizedFn = memoize(clumsySquare);

console.time("First Call");
memoizedFn(24, 45);
console.timeEnd("First Call");

console.time("First Call");
memoizedFn(24, 45);
console.timeEnd("First Call");
