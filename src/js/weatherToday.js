import moment from 'moment';
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
function SetLiveTime() {
  setInterval(() => {
    const timeNode = document.querySelector('#time-current');
    /* timeNode.innerText = moment().format('LT'); */
  }, 1000);
}

SetLiveTime();
