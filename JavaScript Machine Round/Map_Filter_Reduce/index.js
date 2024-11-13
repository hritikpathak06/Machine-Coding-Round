// MAP
const nums = [1, 2, 3, 4];

const multiplyThree = nums.map((num, index) => {
  return num * 2;
});

// console.log(multiplyThree)

// Filter
const filteredElement = nums.filter((num) => {
  return num > 2;
});

// console.log(filteredElement)

// Reduce
const reduceElement = nums.reduce((acc, num) => {
  return num + acc;
});

// console.log(reduceElement)

// PolyFills for Map() func
Array.prototype.myMap = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }

  return temp;
};

const arr = [1,2,3,4,5];

const myCustomMap = arr.myMap((ar) => {
    return ar*4;
});

console.log(myCustomMap)

// Polyfill Filter

Array.prototype.myFilter = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(cb(this[i]));
    }

    return temp;
  }
};

// Polyfill for reduce
// Array.reduce((acc,index,arr) => {},intialVal);
Array.prototype.myReduce = function (cb, intialVal) {
  var accumulator = intialVal;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }

  return accumulator;
};
