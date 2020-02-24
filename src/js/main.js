'use strict';
import sectionWeatherTemplate from '../templates/section-weather.hbs';
import {renderTodayWeatherContainer} from './weatherSectionController';


import {fetchWeatherByCity} from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchFiveDaysWeather.js';
import {debounce} from 'lodash';

const inputDiv = document.querySelector('.js-search');

const mainWeatherBlock = document.querySelector('.box_weather');
const weatherSectionContainer = document.querySelector('.box_today');

inputDiv.addEventListener('input', debounce((event) => {
  const searchQuery = event.target.value;

  fetchAndRenderCityByQuery(searchQuery);
}, 1000));


// show default city on app start
fetchAndRenderCityByQuery('Kyiv');

function fetchAndRenderCityByQuery(searchQuery) {
  fetchWeatherByCity(searchQuery)
    .then(data => {
      clearForm();
      renderMainWeatherBlock(data);
      renderTodayWeatherContainer(data);
      console.log(data);
    })
    .catch(error => console.log(error));

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;`;
  });
  //
  // fetchWeatherFiveDays.fetchFive(searchQuery).then(fiveDaysData => {
  //   console.log('five days:', fiveDaysData);
  //
  // });
}

function renderMainWeatherBlock(data) {
  const markup = sectionWeatherTemplate(data);
  mainWeatherBlock.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  mainWeatherBlock.innerHTML = '';
  weatherSectionContainer.innerHTML = '';
}

