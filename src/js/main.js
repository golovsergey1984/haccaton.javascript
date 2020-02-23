'use strict';
import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';

import PNotify from 'pnotify/dist/es/PNotify.js';

import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
const inputDiv = document.querySelector('.js-search');

inputDiv.addEventListener('input', createListWeatherHandler);

function createListWeatherHandler(e) {
  const searchQuery = e.target.value;
  // console.log(searchQuery)
  fetchWeather
    .fetchCountries(searchQuery)
    .then(data => {
      PNotify.notice({
        title: 'Info',
        text: 'This is a first page!',
        animateSpeed: 'slow',
        delay: 5000,
        addClass: 'custom nonblock',
      });
      notice.on('click', function() {
        notice.close();
      });
      /*  console.log('погода зараз:', data);
      const sun = data.sys.sunrise;
      console.log(sun);
      const date = new Date(sun);
      console.log(date); */

      const hours = date.getUTCHours(sun);
      const min = date.getUTCMinutes(sun);
      const sunrise = `${hours}:${min}`;
      console.log(sunrise);
    })
    .catch(error => console.log(error));

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[2].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays
    .fetchFive(searchQuery)
    .then(data => console.log('погода на 5 днів:', data));
}

// const date = new Date(1582347461);
// console.log(date);

// const dateSunset = new Date(1582385140);
// console.log(date);
