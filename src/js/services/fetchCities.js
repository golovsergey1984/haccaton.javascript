'use strict';

const baseUrl = 'https://pixabay.com/api/';
const key = '&key=15216450-d096caa7dd5d740f777344039';


export function fetchImage(query) {
  return fetch(
    `${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&per_page=12${key}`,
  )
    .then(response => response.json())
    .then(parseImage => parseImage.hits);
};
