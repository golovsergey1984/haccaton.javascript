'use strict';
import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import { debounce } from 'lodash';

import PNotify from 'pnotify/dist/es/PNotify.js';

import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
const inputDiv = document.querySelector('.js-search');

const list = document.querySelector('.list');
inputDiv.addEventListener('input', _.debounce(createListWeatherHandler, 1000));

function createListWeatherHandler(e) {
  const searchQuery = e.target.value;
  fetchWeather
    .fetchCountries(searchQuery)
    .then(data => {})
    .catch(error => console.log(error));

  fetchCities.fetchImage(searchQuery).then(data => {
    PNotify.notice({
      title: 'Info',
      text: 'This is a first page!',
      animateSpeed: 'slow',
      delay: 2000,
      addClass: 'custom nonblock',
    });

    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays.fetchFive(searchQuery).then(data => data);
}
