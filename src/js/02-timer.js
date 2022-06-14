import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (options.defaultDate > selectedDates[0]) {
      window.alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', show);
    }
    function show() {
      timer(selectedDates[0]);
      btnStart.setAttribute('disabled', true);
    }
  },
};
flatpickr(input, options);

function timer(targetDate) {
  const timerId = setInterval(() => {
    const delta = new Date(targetDate) - new Date();
    if (delta <= 0) {
      clearInterval(timerId);
      return;
    }
    let dataItem = convertMs(delta);
    renderTimer(dataItem);
  }, 1000);
}

function renderTimer(number) {
  dataDays.textContent = addLeadingZero(number.days);
  dataHours.textContent = addLeadingZero(number.hours);
  dataMinutes.textContent = addLeadingZero(number.minutes);
  dataSeconds.textContent = addLeadingZero(number.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
