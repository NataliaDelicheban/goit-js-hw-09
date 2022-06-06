const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', true);
  //console.log('start');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
  //console.log('stop!');
});
