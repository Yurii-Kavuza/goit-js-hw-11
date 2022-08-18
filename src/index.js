import './css/styles.css';
import './css/cards.css';
import dedoubce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchPictures } from './js/fetchPictures';
//import getRefs from './js/getRefs';
import { cardInfo } from './js/markup';

const refs = {
  cardContainer: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
};

refs.form.addEventListener('submit', onSearch);
console.log(refs);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  console.log(form);
  const searchedQuery = form.elements.searchQuery.value;

  fetchPictures(searchedQuery, 1)
    .then(({ total, hits }) => {
      cleanMarkup();
      renderMarkup(hits);
      Notify.success(`Hooray! We found ${total} images.`);
    })
    .catch(onFetchError);
}

function renderMarkup(data) {
  let markup = '';
  markup = createMarkup(data);
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

// const DEBOUNCE_DELAY = 300;

// const refs = getRefs();

// function onInput(e) {
//   cleanMarkup();

//   const countryName = e.target.value.trim();

//   if (countryName === '') {
//     cleanMarkup;
//     return;
//   }

//   fetchCountries(countryName)
//     .then(verifyDataMaxLength)
//     .then(renderMarkup)
//     .catch(onFetchError);
// }

// function verifyDataMaxLength(data) {
//   if (data.length > 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.');
//   } else {
//     return data;
//   }
// }

// function renderMarkup(countries) {
//   const quantity = countries.length;
//   console.log(countries);
//   let markup = '';

//   if (quantity == 1) {
//     markup = createMarkup(countries, countryInfo);
//     refs.countryInfo.insertAdjacentHTML('beforeend', markup);
//   } else if (quantity > 1 && quantity <= 10) {
//     markup = createMarkup(countries, countriesList);
//     refs.countryList.insertAdjacentHTML('beforeend', markup);
//   } else {
//     return;
//   }
// }

function createMarkup(images) {
  return images.reduce((acc, image) => acc + cardInfo(image), '');
}

function cleanMarkup() {
  refs.cardContainer.innerHTML = '';
}

function onFetchError(error) {
  if (error === '404') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
