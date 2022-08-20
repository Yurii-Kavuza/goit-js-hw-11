import './css/styles.css';
import { Notify } from 'notiflix';
import PixabeyApiService from './js/pixabey-api-service';
import { cardInfo } from './js/markup';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  cardContainer: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  //loadMoreBtn: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const pixabeyApiService = new PixabeyApiService();

console.log(loadMoreBtn);

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
//refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabeyApiService.searchedQuery = e.currentTarget.elements.searchQuery.value;

  pixabeyApiService.resetPage();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  pixabeyApiService.fetchPictures().then(({ total, hits }) => {
    cleanMarkup();
    renderMarkup(hits);
    checkFirstInput(hits, total);
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  pixabeyApiService.fetchPictures().then(({ total, hits }) => {
    renderMarkup(hits);
    loadMoreBtn.enable();
    checkLastPage(
      pixabeyApiService.getPage(),
      pixabeyApiService.getTotalPages(total)
    );
  });
}

function renderMarkup(data) {
  let markup = '';
  markup = createMarkup(data);
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function checkFirstInput(hits, total) {
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hide();
  } else {
    Notify.success(`Hooray! We found ${total} images.`);
    loadMoreBtn.enable();
    checkLastPage(
      pixabeyApiService.getPage(),
      pixabeyApiService.getTotalPages(total)
    );
  }
}

function checkLastPage(currentPage, totalPages) {
  if (currentPage > totalPages) {
    loadMoreBtn.hide();
    setTimeout(() => {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }, 1500);
  }
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

function verifyDataLength(data) {
  if (data.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
}

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
