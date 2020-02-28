import { fetchAndRenderCityByQuery } from '../js/main.js';
import { fetchAndRenderCityImage } from '../js/main.js';

//====fetch weather======
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf7ee983cc3ce675dc38a2920f2d4f17';

function fetchWeatherByCityName(lat, lon) {
  const url = `${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${key}&lang=en&units=metric`;

  return fetch(url).then(response => response.json());
}

//===geolocation=====
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getCurrentPosition()
  .then(location => {
    success(location);
  })
  .catch(error => console.log(error));

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const latitudeToFixed = latitude.toFixed(2);
  const longitudeToFixed = longitude.toFixed(2);

  fetchWeatherByCityName(latitudeToFixed, longitudeToFixed).then(data => {
    let cityName = data.name;
    console.log('your city name:', cityName + ' img url added');

    fetchAndRenderCityByQuery(cityName);
  });
}
