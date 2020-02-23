'use strict';
import fetchWeather from './services/fetchWeather.js';
import fetchCities from './services/fetchCities.js';
import fetchWeatherFiveDays from './services/fetchWeatherFiveDays.js';
import input from './input.js'
const inputDiv = document.querySelector('.js-search');
const list = document.querySelector('.list');
inputDiv.addEventListener('input', createListWeatherHandler);

function createListWeatherHandler(e) {

    const searchQuery = e.target.value;
    // console.log(searchQuery)
    fetchWeather.fetchCountries(searchQuery)
        .then(data => {
            console.log('погода зараз:', data)
            const sun = data.sys.sunrise;
            console.log("SUN",sun);
            const date = new Date(sun);
            console.log('data sun:',date);

            const hours = date.getUTCHours(sun);
            const min = date.getUTCMinutes(sun);
            const sunrise = `${hours}:${min}`;
            console.log(sunrise);
            input.CreateTodayNode(data.sys.sunrise,data.sys.sunset);
        })
        .catch(error => console.log(error))

    fetchCities.fetchImage(searchQuery)
        .then(data => console.log('зображення міст:', data.hits))

    fetchWeatherFiveDays.fetchFive(searchQuery)
        .then(data => console.log('погода на 5 днів:', data))
}



// const date = new Date(1582347461);
// console.log(date);

// const dateSunset = new Date(1582385140);
// console.log(date);