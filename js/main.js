const MESSAGES = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'В целом всё неплохо. Но не всё.'
];

const NAMES = [
  'Саркастик Петрович',
  'Иннокентий Многословов',
  'Евлампий Незамолкающий',
  'Философ Иванов',
  'Борис Глаголевич',
  'Пафнутий Блаблаблаев',
];

const CAPTIONS = [
  'Наслаждаясь прекрасным днем.',
  'Отличные воспоминания!',
  'Время, проведенное с пользой.',
  'Один из тех моментов...',
  'Жизнь в движении.',
  'Еще один замечательный день.',
  'Просто наслаждаюсь моментом.',
  'Так много эмоций в одной фотографии.',
  'Прекрасное место, прекрасные люди.',
  'Вот это да!',
  'Сегодняшний день был великолепен.',
  'Простые радости жизни.',
  'Удивительное приключение.',
  'Запомнится надолго.',
  'Открывая новые горизонты.',
  'Время с близкими — бесценно.',
  'Так здорово быть здесь!',
  'Маленькие моменты счастья.',
  'Мечты становятся реальностью.',
  'Прекрасные виды и хорошее настроение.',
  'Один день из жизни.',
  'Всегда в движении.',
  'Отличный способ провести время.',
  'Всегда с улыбкой.',
  'Эти моменты бесценны.'
];

const PHOTO_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 30;
const COMMENTS_ARRAY_LENGTH = 30;


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// function getRandomInteger1(min, max) {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = max === Infinity ? Number.MAX_SAFE_INTEGER : Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// }

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator ();


const getRandomComments = () => {
  const numberOfComments = getRandomInteger(1, 2); // случайное количество комментариев (1 или 2)
  const comments = [];

  while (comments.length < numberOfComments) {
    const randomIndex = getRandomInteger(0, MESSAGES.length - 1);
    const randomCommentText = MESSAGES[randomIndex];

    if (!comments.includes(randomCommentText)) {
      comments.push(randomCommentText);
    }
  }

  return comments;
};

const randomComment = () => {
  const authorID = getRandomInteger(1, 6);

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${authorID}.svg`,
    message: getRandomComments(),
    name: NAMES[authorID - 1]
  };
};

// console.log(randomComment);

const commentsArray = Array.from({length: COMMENTS_ARRAY_LENGTH}, randomComment);
// console.log(commentsArray);

const generatePhotoID = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

const photoDescription = () => {
  const id = generatePhotoID();
  const photoComments = Array.from({ length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT) }, () => commentsArray[getRandomInteger(0, commentsArray.length - 1)]);
  return {
    id,
    url: `photos/${id}.jpg`,
    description: CAPTIONS[getRandomInteger(0, CAPTIONS.length - 1)],
    likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
    comments: photoComments
  };
};

// console.log(photoDescription);

const photoDescriptions = Array.from({length: PHOTO_COUNT}, photoDescription);
console.log(photoDescriptions);
