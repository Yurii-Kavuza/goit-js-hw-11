const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29343329-eb32098cf47fcc64118c9b881';
const IMG_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = '40';

export const fetchPictures = (query, page) => {
  const fullQuery = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=${IMG_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&per_page=${PER_PAGE}&page=${page}`;

  return fetch(fullQuery).then(response => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return Promise.reject('404');
    }
  });
};
