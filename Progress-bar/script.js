const startBtn = document.getElementById("startBtn");
const counter = document.getElementById("progress_bar");
const text = document.getElementById("text");

let width = 0;

startBtn.addEventListener("click", () => {
  console.log("Timer started");
  const intervalId = setInterval(() => {
    if (width >= 100) {
      clearInterval(intervalId);
      console.log("Timer ended");
      return;
    }
    width += 10;
    counter.style.width = `${width}%`;
    if (width >= 10) {
      counter.style.backgroundColor = "blue";
    }
    if (width >= 50) {
      counter.style.backgroundColor = "yellow";
    }
    if (width >= 80) {
      counter.style.backgroundColor = "green";
    }
    text.innerHTML = `${width}%`;
  }, 1000);
});
