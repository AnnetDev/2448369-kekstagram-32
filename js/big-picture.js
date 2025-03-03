const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const shownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const totalCountElement = commentCountElement.querySelector('.social__comment-total-count');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const COMMENTS_PER_PAGE = 5;
let commentsShown = 0;
let currentComments = [];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplateElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsShown = 0;
  currentComments = comments;
  commentListElement.innerHTML = '';
  loadMoreComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

function loadMoreComments() {
  const fragment = document.createDocumentFragment();
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);
  commentsToShow.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
  commentsShown += commentsToShow.length;
  updateCommentCount();

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
}

function updateCommentCount() {
  shownCountElement.textContent = commentsShown;
  totalCountElement.textContent = currentComments.length;
}

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', loadMoreComments);

export { showBigPicture };
