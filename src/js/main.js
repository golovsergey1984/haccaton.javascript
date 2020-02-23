'use strict';
import topDivTemplate from '../templates/section-weather.hbs';
import bottomDivTemplate from '../templates/sectionToday.hbs';

import items from './services/fetchWeather.js';

import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import wetherToday from './wetcherToday.js';
import { debounce } from 'lodash';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
PNotify.defaults.styling = 'material';

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
      pnotifyOk();
    })
    .catch(error => pnotifyErr());

  fetchCities.fetchImage(searchQuery).then(data => {
    const imageCity = data[0].largeImageURL;
    const body = document.querySelector('body');
    body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `;
  });

  fetchWeatherFiveDays.fetchFive(searchQuery).then(data => {});
}

function buildtopDiv(data, icon) {
  const markup = topDivTemplate(data);
  postItem.insertAdjacentHTML('beforeend', markup);
}

function buildBottomDiv(data) {
  const andData = wetherToday.CreateTodayData(
    data.sys.sunrise,
    data.sys.sunset,
  );
  const markup = bottomDivTemplate(andData);
  postItemBottom.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  postItem.innerHTML = '';
  postItemBottom.innerHTML = '';
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
