'use strict';
import topDivTemplate from '../templates/section-weather.hbs';
import items from './services/fetchWeather.js';

import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import wetherToday from './wetcherToday.js'
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
      wetherToday.CreateTodayNode(data.sys.sunset,data.sys.sunrise);
    })
    .catch(error => console.log(error));

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays.fetchFive(searchQuery).then(data => data);
}

function buildtopDiv(data) {
  const markup = topDivTemplate(data);
  postItem.insertAdjacentHTML('beforeend', markup);
}
function clearForm() {
  postItem.innerHTML = '';
}
