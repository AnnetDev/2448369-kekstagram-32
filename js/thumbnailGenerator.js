const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Если в режиме разработки, BASE_URL будет пустым,
// а в продакшене – внешний URL
const BASE_URL = import.meta.env.DEV ? '' : 'https://32.javascript.htmlacademy.pro/kekstagram';

const getImageUrl = (pictureUrl) =>
  pictureUrl.startsWith('http')
    ? pictureUrl
    : `${BASE_URL}${pictureUrl}`;

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = getImageUrl(url);
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
