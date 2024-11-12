// script.js
document.querySelector('.slider').addEventListener('mouseover', function () {
    this.style.animationPlayState = 'paused';
  });
  
  document.querySelector('.slider').addEventListener('mouseout', function () {
    this.style.animationPlayState = 'running';
  });
  