'use strict';
var OBJ_QUANTITY = 8;

var LIST_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var getRandomNumber = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var getRandomIndex = function (arr) {
  return getRandomNumber(0, arr.length - 1);
};

var generateAvatar = function () {
  var result = [];
  for (var i = 1; i <= OBJ_QUANTITY; i++) {
    var avatar = 'img/avatars/user0' + i + '.png';
    result.push(avatar);
  }
  return result;
};

var getRandomItem = function (arr) {
  var index = getRandomIndex(arr);
  return arr[index];
};
var generateObj = function () {
  return {
    author: {
      avatar: getRandomItem(generateAvatar())
    },
    offer: {
      title: getRandomItem(LIST_TITLE),
      address: getRandomNumber(250, 850) + ', ' + getRandomNumber(130, 630),
      price: getRandomNumber(1000, 1000000),
      type: getRandomIndex(TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomIndex(CHECKIN),
      checkout: getRandomIndex(CHECKOUT),
      features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)),
      description: '',
      photos: PHOTOS.sort(function () {
        return 0.5 - Math.random();
      }),
    },
    location: {
      x: getRandomNumber(250, 850),
      y: getRandomNumber(130, 630)
    }
  };
};
var objList = generateObj();
// console.log(obj);

var generateArray = function () {
  var result = [];
  for (var i = 0; i <= OBJ_QUANTITY; i++) {
    var object = generateObj();
    result.push(object);
  }
  return result;
};
var arrList = generateArray();
// console.log(arrList);

// DOM-элементы для меток
var generatePin = function (add) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var element = template.cloneNode(true);
  element.style = 'left: ' + add.location.x + 'px; top: ' + add.location.y + 'px;';
  element.querySelector('img').src = add.author.avatar;
  element.querySelector('img').alt = add.offer.title;
  return element;
};
// Отрисовка
var drawPins = function (add) {
  var map = document.querySelector('.map__pins');
  for (var i = 0; i < add.length; i++) {
    var pin = generatePin(add[i]);
    map.appendChild(pin);
  }
};

var renderType = function () {
  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return types;
};

var fillFeatures = function (features, arr) {
  features.innerHTML = '';
  for (var i = 0; i < arr.offer.features.length; i++) {
    var cardFeaturesItem = document.createElement('li');
    cardFeaturesItem.classList.add('popup__feature');
    cardFeaturesItem.classList.add('popup__feature--' + arr.offer.features[i]);
    features.appendChild(cardFeaturesItem);
  }
};

var generateCard = function (add) {
  var title = document.querySelector('.popup__title');
  title.textContent = add.offer.title;

  var address = document.querySelector('.popup__text--address');
  address.textContent = add.offer.address;

  var price = document.querySelector('.popup__text--price');
  price.textContent = add.offer.price + '₽/ночь';

  var type = document.querySelector('.popup__type');
  type.textContent = renderType(add.offer.type);

  var room = document.querySelector('.popup__text--capacity');
  room.textContent = add.offer.rooms + ' комнаты для ' + add.offer.guests + ' гостей';

  var check = document.querySelector('.popup__text--time');
  check.textContent = 'Заезд после ' + add.offer.checkin + ', выезд до ' + add.offer.checkout;

  var features = document.querySelector('.popup__features');
  fillFeatures(features, arrList);

  var description = document.querySelector('.popup__description');
  description.textContent = add.offer.description;

  var photoCard = document.querySelector('.popup__photos');
  var photo = photoCard.querySelector('img');
  photo.src = PHOTOS[0];
  for (var i = 1; i < PHOTOS.length; i++) {
    var next = photo.cloneNode(true);
    next.src = PHOTOS[i];
    photoCard.appendChild(next);
  }

  var avatar = document.querySelector('.popup__avatar');
  avatar.src = add.author.avatar;
};

var renderCard = function (add) {
  var map = document.querySelector('.map');
  var containerBefore = document.querySelector('.map__filters-container');
  var advCard = generateCard(add[0]);
  map.insertBefore(advCard, containerBefore);
};

generateArray(OBJ_QUANTITY);
generatePin(objList);
drawPins(arrList);
renderCard(arrList);

// Убираем класс .map--faded у блока .map
var map = document.querySelector('.map');
map.classList.remove('map--faded');
