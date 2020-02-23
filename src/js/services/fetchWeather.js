'use strict';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf7ee983cc3ce675dc38a2920f2d4f17';

export default {
    fetchCountries(query) {
        const requestParams = `${query}`;

        return fetch(`${baseUrl}weather?q=${query}&appid=${key}&lang=ru&units=metric`)
            .then(response => response.json())
            .then(parsed => {
                console.log('code:', parsed.cod)
                if (parsed.cod === "404") {
                    alert('Веедите корректное название города, если хотите узнать погоду!')
                }
                return parsed.main
            })
    }
}
