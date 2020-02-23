
import sectionToday from '../templates/sectionToday.hbs';

const sectionParrenNode = document.querySelector('.section_today');

export default { CreateTodayNode (sunRise,sunSet){ 
    if (sectionParrenNode !== '') {sectionParrenNode.innerHTML = '';}  
    console.log('SunRISE:',sunRise);
    const sunSetTime = new Date(sunSet).getUTCHours() +':'+ new Date(sunSet).getMinutes();    
     console.log('Hours of sunset time:',sunSetTime);
    const sunRiseTime = new Date(sunRise).getUTCHours() +':'+ new Date(sunRise).getMinutes();    
     console.log('Hours of sunRise time:',sunRiseTime);
    const date = new Date();
    const hours =  2 + date.getUTCHours();
    const min = date.getMinutes();
    const currentTime = hours +":"+ min ;      
    const mounthDay = date.getDate();
    const mounth = date.getMonth();
    const day = date.getDay();      
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsArr =["January","February","March","April","May","June","July",
    "August","September","October","November","December"]    
    const dataToTemp = {
        currentTime,        
        mounthDay,
        day: dayArr[day],
        mounth: monthsArr[mounth],
        sunset:sunSetTime,
        sunrise:sunRiseTime,
    };
    
    sectionParrenNode.insertAdjacentHTML('beforeend', sectionToday(dataToTemp));
}} 

// CreateTodayNode(1582366837,15823555140);

// const searchInput = document.querySelector('input');

// class   Search {
//     constructor(parrentNode,){
//         this.parrentNode = parrentNode;
//         this.input = ''
//         this.cityArr = []
//     }
//     dataTransfer(){
//         return console.log('DATA TRANSER');
//      }    
   
//    createHistory(city){       
//         this.cityArr.push(city);       
//         localStorage.setItem('history',JSON.stringify(this.cityArr))    ;

//    }
//     readHistory (){
//         return JSON.parse (localStorage.getItem('history'));
//     }
//     createHistoryList (){
        
//     }

 
// }

// 

// const search = new Search (searchInput);
// implament in async logic.

// fetchWeather.fetchCountries();