import { renderGallery } from './gallery.js';
import './form_utils.js';
import './scale.js';
import { setFormSubmit, closeUploadInput } from './form_utils.js';
import { getData } from './api.js';
import { showDataError } from './util.js';
import { initFilters } from './filter.js';
import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';


getData()
  .then((pictures) => {
    renderGallery(pictures);
    initFilters(pictures);
  })
  .catch(() => {
    showDataError();
  });

setFormSubmit(closeUploadInput);

