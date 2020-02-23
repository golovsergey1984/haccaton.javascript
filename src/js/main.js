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
  // console.log(searchQuery)
  fetchWeather
    .fetchCountries(searchQuery)
    .then(data => {
      console.log('погода зараз:', data);
      console.log('1111111111111:', data.main.temp);
      console.log('1111111111111:', data.name);

      /*     console.log("111111111111111111111"+weather )
           console.log('222222222222222222222'+city) */

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
  /* console.log('markup:', markup) */
  postItem.insertAdjacentHTML('beforeend', markup);
}

// const date = new Date(1582347461);
// console.log(date);

// const dateSunset = new Date(1582385140);
// console.log(date);

function clearForm() {
  postItem.innerHTML = '';
}
