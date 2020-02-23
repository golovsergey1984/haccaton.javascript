'use strict';
import topDivTemplate from '../templates/section-weather.hbs';
import items from './services/fetchWeather.js';

import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';

const postItem = document.querySelector('.box_weather');

const inputDiv = document.querySelector('.js-search');
const list = document.querySelector('.list');
inputDiv.addEventListener('input', createListWeatherHandler);

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
    const imageCity = data[2].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays
    .fetchFive(searchQuery)
    .then(data => console.log('погода на 5 днів:', data));
}

function buildtopDiv(data) {
  const markup = topDivTemplate(data);
  postItem.insertAdjacentHTML('beforeend', markup);
}
function clearForm() {
  postItem.innerHTML = '';
}
