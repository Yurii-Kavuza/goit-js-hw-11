const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = country => {
  return fetch(`${BASE_URL}/name/${country}`).then(response => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return Promise.reject('404');
    }
  });
};
