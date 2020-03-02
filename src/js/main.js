'use strict';
import sectionWeatherTemplate from '../templates/section-weather.hbs';
import { renderTodayWeatherContainer } from './weatherSectionController';
import { SetLiveTime } from './weatherToday.js';
import {InputHistory} from './weatherToday.js';

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
const historyList = new InputHistory(1,inputDiv,1);

inputDiv.addEventListener(
  'input',
  debounce(event => {
    const searchQuery = event.target.value;

    fetchAndRenderCityByQuery(searchQuery);
  }, 1000),
);

inputDiv.addEventListener('click',({target})=> {
  historyList.clickControler(target.innerText);
  console.dir(target);
});

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
        SetLiveTime();
        console.log(data);        
        historyList.addCity(data.name);
        historyList.createHistoryList();        
      }
    })
    .catch(error => pnotifyErr());
}

export function fetchAndRenderCityImage(searchQuery) {
  if (typeof searchQuery === undefined) {
    searchQuery = 'weather';
  }

  fetchImage(searchQuery).then(data => {
    if (data.length === 0) {
      searchQuery = 'weather';
      fetchAndRenderCityImage(searchQuery);
    } else {
      const imageCity = data[0].largeImageURL;
      const body = document.querySelector('body');
      body.style.cssText = `background-image: url("${imageCity}")`;
    }
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
