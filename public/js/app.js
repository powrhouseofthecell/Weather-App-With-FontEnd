// console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const location = search.value;

   messageOne.textContent = 'Loading...';
   messageTwo.textContent = '';

   fetch('http://localhost:3000/weather?address=' + location).then(
      (response) => {
         response.json().then((data) => {
            messageOne.textContent = `Temperature: ${data.tmp}`;
            messageTwo.textContent = `Description: ${data.des}`;
            messageThree.textContent = `Humidity: ${data.humidity}`;
            messageFour.textContent = `Location: ${data.country}`;
         });
      }
   );
});
