import moment from 'moment';
export default {
  createTodayData(sunRise, sunSet, timeZone) {
    console.log(moment().format('LTS'));
    const sunSetTime =
      new Date((sunSet + timeZone) * 1000).getUTCHours() +
      ':' +
      new Date((sunSet + timeZone) * 1000).getMinutes();
    const sunRiseTime =
      new Date((sunRise + timeZone) * 1000).getUTCHours() +
      ':' +
      new Date((sunRise + timeZone) * 1000).getMinutes();
    const date = new Date();
    const hours = 2 + date.getUTCHours();
    const min = date.getMinutes();
    const currentTime = hours + ':' + min;
    const mounthDay = date.getDate();
    const mounth = date.getMonth();
    const day = date.getDay();

    const dayArr = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const monthsArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return {
      currentTime,
      mounthDay,
      day: dayArr[day],
      mounth: monthsArr[mounth],
      sunset: sunSetTime,
      sunrise: sunRiseTime,
    };
  },
};
