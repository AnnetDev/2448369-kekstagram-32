const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Основная функция для выполнения запросов
const load = (route, method = Method.GET, body = null) => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}${route}`, {
    method,
    body,
  })
    .then((response) => {
      if (!response.ok) {
        return reject(new Error(`Произошла ошибка ${response.status}: ${response.statusText}`));
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

// Функция для получения данных
const getData = () => new Promise((resolve, reject) => {
  load(Route.GET_DATA)
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

// Функция для отправки данных
const sendData = (body) => new Promise((resolve, reject) => {
  load(Route.SEND_DATA, Method.POST, body)
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export { getData, sendData };
