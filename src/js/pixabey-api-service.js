const API_KEY = '29343329-eb32098cf47fcc64118c9b881';
const BASE_URL = 'https://pixabay.com/api';
const IMG_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;
const PER_PAGE = 40;

export default class PixabeyApiService {
  constructor() {
    this.searchedQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    const fullQuery = `${BASE_URL}/?key=${API_KEY}&q=${this.searchedQuery}&image_type=${IMG_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}&per_page=${PER_PAGE}&page=${this.page}`;

    return fetch(fullQuery)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }

  get searchQuery() {
    return this.searchedQuery;
  }

  set searchQuery(newQuery) {
    this.searchedQuery = newQuery;
  }
}
