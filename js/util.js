const ALERT_SHOW_TIME = 5000;

const showDataError = () => {
  const template = document.querySelector('#data-error').content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { showDataError, debounce };

