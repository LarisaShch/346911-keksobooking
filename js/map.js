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

var form = document.querySelector('.ad-form');
var formSpace = form.querySelectorAll('fieldset');
var filtersForm = document.querySelector('.map__filters');
var filterSelector = filtersForm.querySelectorAll('.map__filter');
var filterFeatures = filtersForm.querySelector('fieldset');


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
var generatePin = function (pin) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var element = template.cloneNode(true);
  element.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  element.querySelector('img').src = pin.author.avatar;
  element.querySelector('img').alt = pin.offer.title;
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
  var type = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return type;
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

var generateCard = function (card) {
  var template = document.querySelector('#card').content;
  var element = template.cloneNode(true);

  var title = element.querySelector('.popup__title');
  title.textContent = card.offer.title;

  var address = element.querySelector('.popup__text--address');
  address.textContent = card.offer.address;

  var price = element.querySelector('.popup__text--price');
  price.textContent = card.offer.price + '₽/ночь';

  var type = element.querySelector('.popup__type');
  type.textContent = renderType(card.offer.type);

  var room = element.querySelector('.popup__text--capacity');
  room.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

  var check = element.querySelector('.popup__text--time');
  check.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var features = element.querySelector('.popup__features');
  fillFeatures(features, objList);

  var description = element.querySelector('.popup__description');
  description.textContent = card.offer.description;

  var photoCard = element.querySelector('.popup__photos');
  var photo = photoCard.querySelector('img');
  photo.src = PHOTOS[0];
  for (var i = 1; i < PHOTOS.length; i++) {
    var next = photo.cloneNode(true);
    next.src = PHOTOS[i];
    photoCard.appendChild(next);
  }

  var avatar = element.querySelector('.popup__avatar');
  avatar.src = card.author.avatar;

  return element;
};

var renderCard = function (card) {
  var map = document.querySelector('.map');
  var containerBefore = document.querySelector('.map__filters-container');
  var advCard = generateCard(card);
  deleteMap();
  map.insertBefore(advCard, containerBefore);

  var close = document.querySelector('.popup__close');
  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    deleteMap();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      deleteMap();
    }
  });
};

var deleteMap = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard !== null) {
    mapCard.remove();
  }
};

var addShowCard = function (pin, add) {
  pin.addEventListener('click', function (event) {
    event.preventDefault();
    renderCard(add);
  });
};

var disableElements = function (elementList) {
  elementList.forEach(function (element) {
    element.setAttribute('disabled', 'disabled');
  });
};

var enableElements = function (element) {
  element.forEach(function (elements) {
    elements.removeAttribute('disabled');
  });
};

var pinButton = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
pinButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  enableElements(formSpace);
  enableElements(filterSelector);
  filterFeatures.removeAttribute('disabled');
  drawPins(arrList);
  var mapPin = document.querySelectorAll('.map__pin');
  for (var i = 1; i < mapPin.length; i++) {
    addShowCard(mapPin[i], arrList[i - 1]);
  }
});

disableElements(formSpace);
disableElements(filterSelector);

// Заполнение  адреса

var addres = document.querySelector('#address');
var buttonX = parseInt(pinButton.style.left.replace('px', ''), 10) + 32;
var buttonY = parseInt(pinButton.style.top.replace('px', ''), 10) + 84;
addres.value = buttonX + ', ' + buttonY;

generateArray(OBJ_QUANTITY);
generatePin(objList);
