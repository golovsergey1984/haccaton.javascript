'use strict';
import topDivTemplate from '../templates/section-weather.hbs';
import items from './services/fetchWeather.js';

import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import { debounce } from 'lodash';

const inputDiv = document.querySelector('.js-search');

const list = document.querySelector('.list');
const postItem = document.querySelector('.box_weather');
inputDiv.addEventListener('input', _.debounce(createListWeatherHandler, 1000));

function createListWeatherHandler(e) {
  const searchQuery = e.target.value;
  fetchWeather
    .fetchCountries(searchQuery)
    .then(data => {
      clearForm();
      buildtopDiv(data);
    })
    .catch(error => console.log(error));

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays.fetchFive(searchQuery).then(data => {
    console.log('five days:', data)
  });
}

function buildtopDiv(data, icon) {
  const markup = topDivTemplate(data);
  postItem.insertAdjacentHTML('beforeend', markup);
}
function clearForm() {
  postItem.innerHTML = '';
}


const date = new Date(1582470000);
console.log('date', date)