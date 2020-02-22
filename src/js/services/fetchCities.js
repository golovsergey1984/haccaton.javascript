'use strict';

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/';
const key = '&key=15216450-d096caa7dd5d740f777344039';

export default {

    fetchImage(query) {
        return fetch(`${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&per_page=12${key}`)
            .then(response => response.json())
    }
};