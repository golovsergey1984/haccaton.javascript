import sectionToday from '../templates/sectionToday.hbs';

const sectionParrenNode = document.querySelector('.section_today');

export default {
  CreateTodayData(sunRise, sunSet) {
    /*  if (sectionParrenNode !== '') {
      sectionParrenNode.innerHTML = '';
    } */

    console.log('SunRISE:', sunRise);
    const sunSetTime = 2+
      new Date(sunSet*1000).getUTCHours() + ':' + new Date(sunSet*1000).getMinutes();
    console.log('Hours of sunset time:', sunSetTime);
    const sunRiseTime = 2 +
      new Date(sunRise*1000).getUTCHours() + ':' + new Date(sunRise*1000).getMinutes();
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
