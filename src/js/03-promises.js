import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');

let position = 0;

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  setTimeout(() => {
    for (let i = 0; i < amount.value; i += 1) {
      const s = +delay.value + +step.value * i;
      position = i;
      createPromise(position, s)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
          //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
          //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  // return promise;
}
