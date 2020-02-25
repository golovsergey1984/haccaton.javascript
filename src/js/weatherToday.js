import moment from 'moment';
export default {
  createTodayData(sunRise, sunSet, timeZone) {   
    const timeShifter = (time, timeZone) => new Date((time + timeZone) * 1000);
    const sunset =
      timeShifter(sunSet, timeZone).getUTCHours() +
      ':' +
      timeShifter(sunSet, timeZone).getMinutes();
    const sunrise =
      timeShifter(sunRise, timeZone).getUTCHours() +
      ':' +
      timeShifter(sunRise, timeZone).getMinutes();
    const month = moment().format('MMMM');
    const monthDay = moment().format('Do');
    const day = moment().format('dddd');
    const currentTime = moment().format('HH:mm');  
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


setInterval(() => {
  const timeNode = document.querySelector("#time-current");
  timeNode.innerText = moment().format('HH:mm');  
}, 1000);

