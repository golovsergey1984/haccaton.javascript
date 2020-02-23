'use strict';
import topDivTemplate from '../templates/section-weather.hbs';
import bottomDivTemplate from '../templates/sectionToday.hbs';

import items from './services/fetchWeather.js';

import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import wetherToday from './wetcherToday.js';
import { debounce } from 'lodash';

import moment from 'moment';

import template from '../templates/fiveDays.hbs'
console.log('templ', template)
const inputDiv = document.querySelector('.js-search');

const list = document.querySelector('.list');
const postItem = document.querySelector('.box_weather');
const postItemBottom = document.querySelector('.box_today');

inputDiv.addEventListener('input', _.debounce(createListWeatherHandler, 1000));

function createListWeatherHandler(e) {
  const searchQuery = e.target.value;
  fetchWeather
    .fetchCountries(searchQuery)
    .then(data => {
      clearForm();
      buildtopDiv(data);
      buildBottomDiv(data);
      /*  wetherToday.CreateTodayNode(data.sys.sunset, data.sys.sunrise); */
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

    const day = data.arrOfFiveDayWeatherObject[0];
    const minTemp = Math.round(Math.min(...day.map(dayData => dayData.main.temp_min)))
    const maxTemp = Math.round(Math.max(...day.map(dayData => dayData.main.temp_max)))
    console.log('minTemp:', minTemp)
    console.log('maxTemp:', maxTemp)

  });
}

function buildtopDiv(data) {
  const markup = topDivTemplate(data);
  postItem.insertAdjacentHTML('beforeend', markup);
}

function buildBottomDiv(data) {
  const andData = wetherToday.CreateTodayData(data.sys.sunrise, data.sys.sunset);
  const markup = bottomDivTemplate(andData);
  postItemBottom.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  postItem.innerHTML = '';
  postItemBottom.innerHTML = '';
}

