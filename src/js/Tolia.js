import topDivTemplate from '../templates/section-weather.hbs';
import items from './services/fetchWeather.js'



const postItem = document.querySelector('.box_weather');


function buildtopDiv(items) {


let markup = topDivTemplate(items)
 postItem.insertAdjacentHTML('beforeend', markup);

/*   const markup = items.map(item => topDivTemplate(item).join(''));
  postItem.insertAdjacentHTML('beforeend',markup); */
}