'use strict';
import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import { debounce } from 'lodash';


const inputDiv = document.querySelector('.js-search');
const list = document.querySelector('.list');
inputDiv.addEventListener('input', _.debounce(createListWeatherHandler, 1000));

function createListWeatherHandler(e) {

    const searchQuery = e.target.value;
    fetchWeather.fetchCountries(searchQuery)
        .then(data => {
            console.log('погода зараз:', data)





        })
        .catch(error => console.log(error))

    fetchCities.fetchImage(searchQuery)
        .then(data => {
            const imageCity = data[0].largeImageURL
            const body = document.querySelector('body');
            body.style.cssText = `background-image: url("${imageCity}"); background-size: cover;
            `

        })

    fetchWeatherFiveDays.fetchFive(searchQuery)
        .then(data => console.log('погода на 5 днів:', data))
}



// const date = new Date(1582392390);
// console.log('set', date);

// const dateSunset = new Date(1582385140);
// console.log(date);


// console.log('погода зараз:', data)
// const sun = data.sys.sunrise;
// console.log(sun)
// const date = new Date(sun);
// console.log(date);

// const hours = date.getUTCHours(sun);
// const min = date.getUTCMinutes(sun);
// const sunrise = `${hours}:${min}`;
// console.log(sunrise);
