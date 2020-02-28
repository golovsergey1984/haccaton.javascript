'use strict';
import sectionWeatherTemplate from '../templates/section-weather.hbs';
import { renderTodayWeatherContainer } from './weatherSectionController';

import { fetchWeatherByCity } from './services/fetchWeather.js';
import { fetchImage } from './services/fetchCities.js';
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

export function fetchAndRenderCityByQuery(searchQuery) {
  fetchWeatherByCity(searchQuery)
    .then(data => {
      if (data.cod === '400') {
        fetchAndRenderCityImage('знак вопроса');
        pnotifyErrNotQuery();
        return;
      } else {
        clearForm();
        renderMainWeatherBlock(data);
        renderTodayWeatherContainer(data);
        fetchAndRenderCityImage(searchQuery);
        pnotifyOk();
        console.log(data);
      }
    })
    .catch(error => pnotifyErr());

  /* fetchAndRenderCityImage(searchQuery); */
}

export function fetchAndRenderCityImage(searchQuery) {
  console.log('Это searchQuery:' + searchQuery);
  if (typeof searchQuery === undefined) {
    searchQuery = 'weather';
  }
  console.log('Это searchQuery после iff:' + searchQuery);
  fetchImage(searchQuery).then(data => {
    console.log('Это запрос по Геолокации :' + data);
    if ((data = undefined)) {
      searchQuery = 'weather';
      console.log('1. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    if (data === undefined) {
      searchQuery = 'weather';
      console.log('2. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    if (data === '') {
      searchQuery = 'weather';
      console.log('3. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    if ((data = '')) {
      searchQuery = 'weather';
      console.log('4. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    if ((data = 0)) {
      searchQuery = 'weather';
      console.log('5. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    if (data === 0) {
      searchQuery = 'weather';
      console.log('6. Это searchQuery в дата:' + searchQuery);
      fetchAndRenderCityImage(searchQuery);
    }

    console.log('Я уже работаю 1н раз');

    const imageCity = data[0].largeImageURL;

    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}")`;
  });
}

/* export function fetchAndRenderCityImage(searchQuery) {
  fetchImage(searchQuery).then(data => {
    if (data.length === 0) {
      fetchAndRenderCityImage('weather');
    } else {
      console.log('Pixabay data: ' + data);
      console.log('IMG bg: ' + data[0].largeImageURL);
      const imageCity = data[0].largeImageURL;
      const body = document.querySelector('body');
      body.style.cssText = `background-image: url("${imageCity}")`;
    }
  });
} */

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

function pnotifyErrNotQuery() {
  let notice = PNotify.notice({
    text: 'To find out the weather, you must enter a query!',
    animateSpeed: 'slow',
    delay: 4000,
  });
  notice.on('click', function() {
    notice.close();
  });
}
