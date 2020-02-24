export default {
  createTodayData(sunRise, sunSet) {
    const sunSetTime =
      2 +
      new Date(sunSet * 1000).getUTCHours() +
      ':' +
      new Date(sunSet * 1000).getMinutes();

    const sunRiseTime =
      2 +
      new Date(sunRise * 1000).getUTCHours() +
      ':' +
      new Date(sunRise * 1000).getMinutes();

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
