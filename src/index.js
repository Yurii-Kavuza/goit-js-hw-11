import './css/styles.css';
import dedoubce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/getRefs';
import { countryInfo, countriesList } from './js/markup';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', dedoubce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  cleanMarkup();

  const countryName = e.target.value.trim();

  if (countryName === '') {
    cleanMarkup;
    return;
  }

  fetchCountries(countryName)
    .then(verifyDataMaxLength)
    .then(renderMarkup)
    .catch(onFetchError);
}

function verifyDataMaxLength(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else {
    return data;
  }
}

function renderMarkup(countries) {
  const quantity = countries.length;
  console.log(countries);
  let markup = '';

  if (quantity == 1) {
    markup = createMarkup(countries, countryInfo);
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
  } else if (quantity > 1 && quantity <= 10) {
    markup = createMarkup(countries, countriesList);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  } else {
    return;
  }
}

function createMarkup(countries, type) {
  return countries.reduce((acc, item) => acc + type(item), '');
}

function cleanMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onFetchError(error) {
  if (error === '404') {
    Notify.failure('Oops, there is no country with that name');
  }
}
