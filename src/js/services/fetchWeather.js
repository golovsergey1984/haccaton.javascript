'use strict';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf7ee983cc3ce675dc38a2920f2d4f17';

export let cityWeather = {
  last: null,
};

export function fetchWeatherByCity(query) {
  const url = `${baseUrl}weather?q=${query}&appid=${key}&lang=en&units=metric`;

  return fetch(url)
    .then(response => response.json())
    .then(weather => {
      cityWeather.last = weather;
      return weather;
    });
}






