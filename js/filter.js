import { renderThumbnails } from './thumbnailGenerator';
import { removeThumbnails } from './gallery';
import { debounce } from './util';

const RANDOM_PHOTOS_COUNT = 10;
let currentPictures = [];

const filterDefault = () => {
  renderThumbnails(currentPictures, document.querySelector('.pictures'));
};

const filterRandom = () => {
  const randomPictures = [];
  const usedIndexes = new Set();
  while (randomPictures.length < RANDOM_PHOTOS_COUNT) {
    const randomIndex = Math.floor(Math.random() * currentPictures.length);
    if (!usedIndexes.has(randomIndex)) {
      randomPictures.push(currentPictures[randomIndex]);
      usedIndexes.add(randomIndex);
    }
  }
  renderThumbnails(randomPictures, document.querySelector('.pictures'));
};

const filterDiscussed = () => {
  const discussedPictures = [...currentPictures].sort((a, b) => b.comments.length - a.comments.length);
  renderThumbnails(discussedPictures, document.querySelector('.pictures'));
};

const filterFunctions = {
  'filter-default': filterDefault,
  'filter-random': filterRandom,
  'filter-discussed': filterDiscussed
};

const onFilterChange = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    if (evt.target.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    removeThumbnails();

    const filterFunction = filterFunctions[evt.target.id];
    if (filterFunction) {
      filterFunction();
    }
  }
};

const debouncedFilterChange = debounce(onFilterChange, 500);

const initFilters = (pictures) => {
  currentPictures = pictures;
  document.querySelector('.img-filters__form').addEventListener('click', debouncedFilterChange);
};

export { initFilters };
