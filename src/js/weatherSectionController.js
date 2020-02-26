import moment from 'moment';
import weatherToday from './weatherToday';
import sectionWeatherTodayTemplate from '../templates/sectionToday.hbs';
import sectionWeatherFiveDaysTemplate from '../templates/sectionFiveDays.hbs';
import { cityWeather } from './services/fetchWeather.js';
import { fetchFiveDaysWeather } from './services/fetchFiveDaysWeather';

const todayWeatherButton = document.querySelector('[data-action="show today"]');
const fiveDaysWeatherButton = document.querySelector(
  '[data-action="show week"]',
);
const weatherSectionContainer = document.querySelector('.box_today');

todayWeatherButton.addEventListener('click', onTodayWeatherButtonClick);
fiveDaysWeatherButton.addEventListener('click', onFiveDaysButtonClick);

function clearWeatherSectionContainer() {
  weatherSectionContainer.innerHTML = '';
}

function onTodayWeatherButtonClick() {
  if (!cityWeather.last) {
    console.log('No last city weather saved');
    return;
  }
  todayWeatherButton.classList.add('enabled');
  fiveDaysWeatherButton.classList.remove('enabled');

  clearWeatherSectionContainer();

  const weather = cityWeather.last;

  console.log('weather: ', weather);

  renderTodayWeatherContainer(weather);
}

function onFiveDaysButtonClick() {
  if (!cityWeather.last) {
    console.log('No last city weather saved');
    return;
  }
  fiveDaysWeatherButton.classList.add('enabled');
  todayWeatherButton.classList.remove('enabled');

  clearWeatherSectionContainer();

  const cityName = cityWeather.last.name;

  renderFiveDaysBlock(cityName);
}

export function renderTodayWeatherContainer(weather) {
  const todayData = weatherToday.createTodayData(
    weather.sys.sunrise,
    weather.sys.sunset,
  );
  const markup = sectionWeatherTodayTemplate(todayData);
  weatherSectionContainer.insertAdjacentHTML('beforeend', markup);
}

function renderFiveDaysBlock(cityName) {
  fetchFiveDaysWeather(cityName).then(fiveDaysData => {
    console.log(fiveDaysData);
    const fiveDaysTemplateData = getFiveDaysTemplateData(fiveDaysData);
    console.log(fiveDaysTemplateData);
    const markup = sectionWeatherFiveDaysTemplate({ fiveDaysTemplateData });
    weatherSectionContainer.insertAdjacentHTML('beforeend', markup);
  });
}

function getFiveDaysTemplateData(fiveDaysResponse) {
  // city was not found
  if (fiveDaysResponse.cod === '404') {
    return [];
  }

  let fiveDaysWeatherData = [];

  for (let i = 0; i < 5; i++) {
    let startDay = moment()
      .add(i, 'days')
      .startOf('day')
      .format('X');
    let endDay = moment()
      .add(i, 'days')
      .endOf('day')
      .format('X');
    let dayArr = fiveDaysResponse.list.filter(
      el => el.dt < endDay && el.dt > startDay,
    );
    fiveDaysWeatherData.push(dayArr);
  }

  return fiveDaysWeatherData.map(day => {
    const minTemp = Math.round(
      Math.min(...day.map(dayData => dayData.main.temp_min)),
    );
    const maxTemp = Math.round(
      Math.max(...day.map(dayData => dayData.main.temp_max)),
    );

    const { dt: date } = day[0] || {};
    const { main, description, icon } = day[0].weather[0];

    return {
      day: 'Monday',
      date,
      icon,
      minTemp,
      maxTemp,
      weatherType: `${description}`,
    };
  });
}
