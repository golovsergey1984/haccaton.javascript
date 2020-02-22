'use strict';
import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';

const inputDiv = document.querySelector('.js-search');
const list = document.querySelector('.list');
inputDiv.addEventListener('input', createListWeatherHandler);

function createListWeatherHandler(e) {

    const searchQuery = e.target.value;
    // console.log(searchQuery)
    fetchWeather.fetchCountries(searchQuery)
        .then(data => {
            console.log('погода зараз:', data)
        })
        .catch(error => console.log(error))

    fetchCities.fetchImage(searchQuery)
        .then(data => console.log('зображення міст:', data.hits))

    fetchWeatherFiveDays.fetchFive(searchQuery)
        .then(data => console.log('погода на 5 днів:', data))
}
