var obj = { name: "Ritik" };

name = "Kartik";

function sayHello(age, profession, ...args) {
  return `Hello ${this.name} and age is ${age} and profession  ${profession} and hero is ${args} and roll no is ${args}`;
}

const bindFunc = sayHello.bind(obj);
console.log(bindFunc(24, "Techaer"));
