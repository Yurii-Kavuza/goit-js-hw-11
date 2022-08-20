import './css/styles.css';
import { Notify } from 'notiflix';
import PixabeyApiService from './js/pixabey-api-service';
import { cardInfo } from './js/markup';
import LoadMoreBtn from './js/load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  cardContainer: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const pixabeyApiService = new PixabeyApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabeyApiService.searchedQuery = e.currentTarget.elements.searchQuery.value;

  pixabeyApiService.resetPage();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  pixabeyApiService.getPictures().then(({ total, hits }) => {
    cleanMarkup();
    renderMarkup(hits);
    checkFirstInput(hits, total);
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  pixabeyApiService.getPictures().then(({ total, hits }) => {
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
  lightbox.refresh();
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

function createMarkup(images) {
  return images.reduce((acc, image) => acc + cardInfo(image), '');
}

function cleanMarkup() {
  refs.cardContainer.innerHTML = '';
}
