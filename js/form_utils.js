import { resetScale } from './scale';
import { setEffect, resetSlider } from './effects';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const publishButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadImg = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const uploadImgCancel = uploadOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const publishButton = form.querySelector('.img-upload__submit');

uploadImg.addEventListener('change', () => {
  openUploadInput();
  const file = uploadImg.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    preview.src = imageUrl;

    const effectPreviews = document.querySelectorAll('.effects__preview');
    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${imageUrl})`;
    });
  }
});

function openUploadInput() {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  setEffect();
}

const isEscapeKey = (evt) => evt.key === 'Escape';

function closeUploadInput() {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
  resetScale();
  resetSlider();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagField || document.activeElement === commentField) {
      evt.stopPropagation();
      return;
    }

    const errorElement = document.querySelector('.error');
    if (errorElement) {
      evt.preventDefault();
      errorElement.remove();
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeUploadInput();
  }
}

function resetForm() {
  uploadImg.value = '';
  form.reset();
  preview.src = '';

  const effectPreviews = document.querySelectorAll('.effects__preview');
  effectPreviews.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = '';
  });

  clearErrors();
}

uploadImgCancel.addEventListener('click', closeUploadInput);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

function clearErrors() {
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
}

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(commentField, validateComment);

function validateHashtags(value) {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  const hashtagPattern = /^#[a-za-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return false;
    }
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
    if (uniqueHashtags.has(hashtag.toLowerCase())) {
      return false;
    }
    uniqueHashtags.add(hashtag.toLowerCase());
  }

  return true;
}

function getHashtagErrorMessage(value) {
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  const hashtagPattern = /^#[a-za-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return 'Максимум 20 символов';
    }
    if (!hashtagPattern.test(hashtag)) {
      return 'Хэштег должен начинаться с # и содержать только буквы и цифры';
    }
    if (uniqueHashtags.has(hashtag.toLowerCase())) {
      return 'Один и тот же хэштег не может быть использован дважды';
    }
    uniqueHashtags.add(hashtag.toLowerCase());
  }
}

pristine.addValidator(hashtagField, validateHashtags, getHashtagErrorMessage);

const blockPublishButton = () => {
  publishButton.disabled = true;
  publishButton.textContent = publishButtonText.SENDING;
};

const unblockPublishButton = () => {
  publishButton.disabled = false;
  publishButton.textContent = publishButtonText.IDLE;
};

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const successButton = document.querySelector('.success__button');
  const successElement = document.querySelector('.success');

  const removeMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest('.success__inner')) {
      removeMessage();
    }
  }

  successButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const errorButton = document.querySelector('.error__button');
  const errorElement = document.querySelector('.error');

  const removeMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest('.error__inner')) {
      removeMessage();
    }
  }

  errorButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockPublishButton();
      await sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockPublishButton);
    }
  });
};

function togglePublishButtonState() {
  const isValid = pristine.validate();
  if (isValid) {
    publishButton.removeAttribute('disabled');
  } else {
    publishButton.setAttribute('disabled', true);
  }
}

hashtagField.addEventListener('input', () => {
  clearErrors();
  togglePublishButtonState();
});

commentField.addEventListener('input', () => {
  clearErrors();
  togglePublishButtonState();
});

export { setFormSubmit, openUploadInput, closeUploadInput };
