// Synchronous Vs Asynchronous code
console.log("Start");

// setTimeout(() => {
// }, 1000);

function importantAction(username) {
  setTimeout(() => {
    console.log("Subscribe to ritik pathak channel  " + username);
  }, 1000);
}

importantAction("Ritik");

console.log("Finish");
