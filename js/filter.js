import { renderThumbnails } from './thumbnailGenerator';
import { removeThumbnails } from './gallery';
import { debounce } from './util';

const RANDOM_PHOTOS_COUNT = 10;
let currentPictures = [];

const imgFiltersForm = document.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');
let activeButton = document.querySelector('.img-filters__button--active');

const filterDefault = () => {
  renderThumbnails(currentPictures, picturesContainer);
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
  renderThumbnails(randomPictures, picturesContainer);
};

const filterDiscussed = () => {
  const discussedPictures = [...currentPictures].sort((a, b) => b.comments.length - a.comments.length);
  renderThumbnails(discussedPictures, picturesContainer);
};

const filterFunctions = {
  'filter-default': filterDefault,
  'filter-random': filterRandom,
  'filter-discussed': filterDiscussed
};

function applyFilter(filterId) {
  removeThumbnails();

  const filterFunction = filterFunctions[filterId];
  if (filterFunction) {
    filterFunction();
  }
}

const debouncedApplyFilter = debounce(applyFilter, 500);

function onFilterChange(evt) {
  if (evt.target.classList.contains('img-filters__button')) {
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    activeButton = evt.target;

    debouncedApplyFilter(evt.target.id);
  }
}

function initFilters(pictures) {
  currentPictures = pictures;
  imgFiltersForm.addEventListener('click', onFilterChange);
}

export { initFilters };
