import moment from 'moment';
import historyListTemplate from '../templates/historyList.hbs';
export default {
  createTodayData(sunRise, sunSet, timeZone) {
    const timeShifter = (time, timeZone) =>
      moment.utc((time + timeZone) * 1000).format('LT');
    const sunset = timeShifter(sunSet, timeZone);
    const sunrise = timeShifter(sunRise, timeZone);
    const month = moment().format('MMM');
    const monthDay = moment().format('Do');
    const day = moment().format('dddd');
    const currentTime = moment().format('LT');
    return {
      currentTime,
      monthDay,
      day,
      month,
      sunset,
      sunrise,
    };
  },
};

export function SetLiveTime() {
  setInterval(() => {
    try {
      const timeNode = document.querySelector('#time-current');
      if (timeNode !== null) {
        // test to existing of node
        timeNode.innerText = moment().format('LT');
      }
    } catch (err) {
      console.log('func SetLiveTime', err);
    }
  }, 1000);
}

export class InputHistory {
  constructor(parrentNode) {
    this.cityName;
    this.parrentNode = parrentNode;
    this.input = '';
    this.cityArr = [];
    this.inputNode = document.querySelector('input');
    this.starter();
  }

  starter() {
    if (this.readHistory() === undefined) {
      return;
    } else {
      this.cityArr = this.readHistory().concat(this.cityArr);
      this.createHistoryList();
    }
  }

  addCity(city) {
    this.cityArr.unshift(city);
    this.cityArr.length = 3;
    localStorage.setItem('history', JSON.stringify(this.cityArr));
  }
  readHistory() {
    try {
      const dataFromLS = localStorage.getItem('history');
      return dataFromLS === null ? undefined : JSON.parse(dataFromLS);
    } catch (err) {
      console.log('Error from LS', err);
    }
  }
  createHistoryList() {
    const controleNode = document.querySelector('.city_list');
    if (controleNode !== null) {
      controleNode.remove();
    }
    const markup = historyListTemplate({ name: this.cityArr });
    this.parrentNode.insertAdjacentHTML('beforeend', markup);
  }
  clickControler(text) {
    const name = this.cityArr.find(city => city === text);
    if (name !== undefined) {
      // this.inputNode.value = name;
      this.inputNode.value = '';
      return name;
    } else {
      return this.cityArr[0];
    }
  }
}
