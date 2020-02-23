export default {
  createTodayData(sunRise, sunSet) {
    const sunsetDate = new Date(sunSet);
    const sunRiseDate = new Date(sunRise);

    console.log('SunRISE:', sunRise);
    const sunSetTime =
      sunsetDate.getUTCHours() + ':' + sunsetDate.getMinutes();
    console.log('Hours of sunset time:', sunSetTime);
    const sunRiseTime =
      sunRiseDate.getUTCHours() + ':' + sunRiseDate.getMinutes();
    console.log('Hours of sunRise time:', sunRiseTime);
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
   return  {
      currentTime,
      mounthDay,
      day: dayArr[day],
      mounth: monthsArr[mounth],
      sunset: sunSetTime,
      sunrise: sunRiseTime,
    };

  },
};
