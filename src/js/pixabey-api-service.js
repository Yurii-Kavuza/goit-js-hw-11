import { Notify } from 'notiflix';
import axios from 'axios';

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

  async getPictures() {
    const fullQuery = `${BASE_URL}/?key=${API_KEY}&q=${this.searchedQuery}&image_type=${IMG_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}&per_page=${PER_PAGE}&page=${this.page}`;

    try {
      const response = await axios.get(fullQuery);
      this.incrementPage();
      return response.data;
    } catch {
      Notify.failure('Wrong request!');
    }
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

  getTotalPages(total) {
    return Math.ceil(total / PER_PAGE);
  }

  get searchQuery() {
    return this.searchedQuery;
  }

  set searchQuery(newQuery) {
    this.searchedQuery = newQuery;
  }
}
