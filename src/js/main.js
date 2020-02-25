'use strict';
import sectionWeatherTemplate from '../templates/section-weather.hbs';
import { renderTodayWeatherContainer } from './weatherSectionController';

import { fetchWeatherByCity } from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchFiveDaysWeather.js';
import { debounce } from 'lodash';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
PNotify.defaults.styling = 'material';

const inputDiv = document.querySelector('.js-search');

const mainWeatherBlock = document.querySelector('.box_weather');
const weatherSectionContainer = document.querySelector('.box_today');

inputDiv.addEventListener(
  'input',
  debounce(event => {
    const searchQuery = event.target.value;

    fetchAndRenderCityByQuery(searchQuery);
  }, 1000),
);

// show default city on app start
fetchAndRenderCityByQuery('Kyiv');

function fetchAndRenderCityByQuery(searchQuery) {
  fetchWeatherByCity(searchQuery)
    .then(data => {
      clearForm();
      renderMainWeatherBlock(data);
      renderTodayWeatherContainer(data);
      pnotifyOk();
    })
    .catch(error => pnotifyErr());

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}");`;
  });
}

function renderMainWeatherBlock(data) {
  const markup = sectionWeatherTemplate(data);
  mainWeatherBlock.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  mainWeatherBlock.innerHTML = '';
  weatherSectionContainer.innerHTML = '';
}

function pnotifyErr() {
  let notice = PNotify.error({
    text: 'There is no such city. \n Lets try again',
    animateSpeed: 'slow',
    delay: 4000,
  });
  notice.on('click', function() {
    notice.close();
  });
}

function pnotifyOk() {
  let notice = PNotify.success({
    text: 'Get your weather',
    animateSpeed: 'slow',
    delay: 4000,
  });
  notice.on('click', function() {
    notice.close();
  });
}

const date = new Date(1582470000);
