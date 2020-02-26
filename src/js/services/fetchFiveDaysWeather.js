'use strict';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf7ee983cc3ce675dc38a2920f2d4f17';

export function fetchFiveDaysWeather(query) {
  return fetch(
    `${baseUrl}forecast?q=${query}&appid=${key}&lang=ru&units=metric`,
  ).then(response => response.json());
}
