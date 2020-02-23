'use strict';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf7ee983cc3ce675dc38a2920f2d4f17';
import moment from 'moment';

export default {
    fetchFive(query) {
        const requestParams = `${query}`;
        return fetch(`${baseUrl}forecast?q=${query}&appid=${key}&lang=ru&units=metric`)
            .then(response => response.json())
            .then(parsedList => searchAverageTempFromFiveDay(parsedList))
    }
}


//====
function searchAverageTempFromFiveDay(data) {
    let arrOfFiveDayWeatherObject = [];
    let arrOfAverageTemp = [];
    let arrOfAverageHumidity = [];
    let arrOfPressure = [];
    let arrOfWindSpeed = [];
    for (let i = 0; i < 5; i++) {
        let startDay = moment().add(i, 'days').startOf('day').format('X');
        let endDay = moment().add(i, 'days').endOf('day').format('X');
        let dayArr = data.list.filter(el => el.dt < endDay && el.dt > startDay);
        arrOfFiveDayWeatherObject.push(dayArr);
        let averageTemp = Math.floor(dayArr.reduce((acc, el) => acc + el.main.temp, 0) / dayArr.length);
        arrOfAverageTemp.push(averageTemp);
        let averageHumidity = Math.floor(dayArr.reduce((acc, el) => acc + el.main.humidity, 0) / dayArr.length);
        arrOfAverageHumidity.push(averageHumidity);
        let averagePressure = Math.floor(dayArr.reduce((acc, el) => acc + el.main.pressure, 0) / dayArr.length / 1.33);
        arrOfPressure.push(averagePressure);
        let averageWind = Math.floor(dayArr.reduce((acc, el) => acc + el.wind.speed, 0) / dayArr.length);
        arrOfWindSpeed.push(averageWind);
    }
    // this.setState({
    //     arrOfFiveDayWeatherObject: arrOfFiveDayWeatherObject,
    //     arrOfAverageTemp: arrOfAverageTemp,
    //     arrOfAverageHumidity: arrOfAverageHumidity,
    //     arrOfPressure: arrOfPressure,
    //     arrOfWindSpeed: arrOfWindSpeed,
    //     isLoading: false,
    // })
    return {
        arrOfFiveDayWeatherObject: arrOfFiveDayWeatherObject,
        arrOfAverageTemp: arrOfAverageTemp,
        arrOfAverageHumidity: arrOfAverageHumidity,
        arrOfPressure: arrOfPressure,
        arrOfWindSpeed: arrOfWindSpeed,
    }
}