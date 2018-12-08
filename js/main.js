'use strict';
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var OFFER_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MAX_USER = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var ESC = 27;
var minGuests = 1;
var maxGuests = 10;
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var maxX = map.offsetWidth;
var mainPin = document.querySelector('.map__pin--main');

var cardPhotos = {
  width: 45,
  height: 35,
  alt: 'Фотография жилья'
};

var getRandNum = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

var getRandInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getParameterIndex = function (array) {
  var parameterIndex = Math.floor(Math.random() * array.length);
  return array[parameterIndex];
};

var shuffle = function (arr) {
  arr.sort(function () {
    return Math.random() - 0.5;
  });
};

shuffle(OFFER_TITLE);


var createUserArray = function (max) {
  var userArray = [];
  for (var j = 1; j <= max; j++) {
    userArray.push(j);
  }
  return userArray;
};

var Users = createUserArray(MAX_USER);

var getRandOrderArray = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var getRandomArray = function (initialArr) {
  var RandomArray = [];
  var amount = getRandNum(initialArr.length);
  for (var i = 0; i < amount; i++) {
    RandomArray.push(initialArr[i]);
  }
  return RandomArray;
};

var ads = [];
var getAdsList = function () {

  var createAd = function () {
    var locationX = getRandNum(maxX);
    var locationY = getRandInRange(MIN_Y, MAX_Y);

    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + Users[i] + '.png'
      },
      'offer': {
        'title': OFFER_TITLE[i],
        'address': locationX + ', ' + locationY,
        'price': getRandInRange(MIN_PRICE, MAX_PRICE),
        'type': getParameterIndex(OFFER_TYPE),
        'rooms': getRandInRange(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandInRange(minGuests, maxGuests),
        'checkin': getParameterIndex(CHECKIN),
        'checkout': getParameterIndex(CHECKOUT),
        'features': getRandomArray(FEATURES),
        'description': '',
        'photos': getRandOrderArray(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    return ad;
  };

  for (var i = 0; i < MAX_USER; i++) {
    ads.push(createAd(i));
  }
};

getAdsList();

var pinRender = function (ad, i) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementWidth = mapPin.offsetWidth;
  var pinElementHeight = mapPin.offsetHeight;
  var pinImage = pinElement.querySelector('img');

  pinElement.style = 'left:' + (ad.location.x - pinElementWidth / 2) + 'px; top: ' + (ad.location.y - pinElementHeight) + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
  pinElement.setAttribute('data-index', i);


  pinElement.addEventListener('click', function (evt) {
    var elementIndex = evt.currentTarget.dataset.index;
    map.insertBefore(cardRender(ads[elementIndex]), mapFilters);
  });

  return pinElement;
};

var getCardFeatures = function (features) {
  var featuresItemsArr = [];

  features.forEach(function (item) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', 'popup__feature--' + item);
    featuresItemsArr.push(featuresItem);
  });

  return featuresItemsArr;
};

var getCardImages = function (images) {
  var cardImages = [];
  images.forEach(function (item) {
    var cardImage = document.createElement('img');
    cardImage.src = item;
    cardImage.width = cardPhotos.width;
    cardImage.height = cardPhotos.height;
    cardImage.alt = cardPhotos.alt;
    cardImage.classList.add('popup__photo');
    cardImages.push(cardImage);
  });

  return cardImages;
};

var renderElements = function (elements, parent) {
  parent.innerHTML = '';
  elements.forEach(function (el) {
    parent.appendChild(el);
  });
};

var cardRender = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotosWrapper = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ad.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  renderElements(getCardFeatures(ad.offer.features), cardFeatures);
  renderElements(getCardImages(ad.offer.photos), cardPhotosWrapper);

  var removeElement = function (parent, element) {
    parent.removeChild(element);
  };

  var cardClose = cardElement.querySelector('.popup__close');
  cardClose.addEventListener('click', function (evt) {
    var target = evt.target;
    var targetBlock = target.parentNode;
    removeElement(map, targetBlock);
  });
  return cardElement;
};

document.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ESC) {
    var currentCard = map.querySelector('.map__card');
    if (currentCard !== null) {
      currentCard.remove();
    }
  }
});

var fragment = document.createDocumentFragment();
var showPins = function () {
  for (var i = 0; i < ads.length; i++) {

    fragment.appendChild(pinRender(ads[i], i));
  }
  mapPins.appendChild(fragment);
};

var formHeader = document.querySelector('.ad-form-header');
var formFieldsets = document.querySelectorAll('.ad-form__element');
var mapFieldsets = document.querySelectorAll('.map__filter');
var formFeatures = document.querySelector('.map__features');

formHeader.setAttribute('disabled', true);
formFeatures.setAttribute('disabled', true);

formFieldsets.forEach(function (el) {
  el.setAttribute('disabled', true);
});
mapFieldsets.forEach(function (el) {
  el.setAttribute('disabled', true);
});

var userDialog = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

var mainPinWidth = mainPin.offsetWidth;
var mainPinStartHeight = mainPin.offsetHeight;
var mainPinStartY = Math.ceil(mainPin.offsetTop + mainPinStartHeight / 2);
var mainPinStartX = Math.ceil(mainPin.offsetLeft + mainPinWidth / 2);
var adress = document.querySelector('#address');

adress.setAttribute('value', mainPinStartX + ' , ' + mainPinStartY);
adress.setAttribute('readonly', true);

var onPinChange = function () {
  userDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  formHeader.removeAttribute('disabled', true);
  formFeatures.removeAttribute('disabled', true);
  formFieldsets.forEach(function (el) {
    el.removeAttribute('disabled', true);
  });
  mapFieldsets.forEach(function (el) {
    el.removeAttribute('disabled', true);
  });
  showPins();
};

var mainPinHeight = mainPinStartHeight + 22;
var mapWidth = map.offsetWidth;

var mapPinsLimits = {
  MIN_Y: 130 - mainPinHeight,
  MAX_Y: 630,
  MIN_X: 0 - mainPinWidth / 2,
  MAX_X: mapWidth - mainPinWidth / 2
};

var getValueInLimit = function (value, min, max) {
  if (value < min) {
    value = min;
  }

  if (value > max) {
    value = max;
  }

  return value;
};

var pinCoords = function (coords) {
  coords.x = getValueInLimit(coords.x, mapPinsLimits.MIN_X, mapPinsLimits.MAX_X);
  coords.y = getValueInLimit(coords.y, mapPinsLimits.MIN_Y, mapPinsLimits.MAX_Y);

  return coords;
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    var resultCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinCoords(resultCoords);

    mainPin.style.top = resultCoords.y + 'px';
    mainPin.style.left = resultCoords.x + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    var mainPinY = Math.ceil(mainPin.offsetTop + mainPinHeight);
    var mainPinX = Math.ceil(mainPin.offsetLeft + mainPinWidth / 2);
    adress.setAttribute('value', mainPinX + ' , ' + mainPinY);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  mainPin.addEventListener('mouseup', onPinChange);
});

var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');

var onTimeInChange = function () {
  adFormTimeOut.value = adFormTimeIn.value;
};

var onTimeOutChange = function () {
  adFormTimeIn.value = adFormTimeOut.value;
};

var onFormTypeChange = function () {
  var minValue = OFFER_PRICE[adFormType.value];

  adFormPrice.placeholder = minValue;
  adFormPrice.min = minValue;
};

var maxCapacity = {
  '1': 1,
  '2': 2,
  '3': 3,
  '100': 0
};

var checkCapacity = function () {
  var roomsNumber = adFormRoomNumber.value;
  var capacity = adFormCapacity.value;
  var possibleCapacity = maxCapacity[roomsNumber];
  if (capacity > possibleCapacity) {
    adFormCapacity.setAttribute('disable', true);
    adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
  } else if (capacity === '0' && possibleCapacity > 0) {
    adFormCapacity.setAttribute('disable', true);
    adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
  } else {
    adFormCapacity.setAttribute('disable', false);
    adFormCapacity.setCustomValidity('');
  }
};

checkCapacity();

var onFormCapacityChange = function () {
  checkCapacity();
};

adFormTimeIn.addEventListener('change', onTimeInChange);
adFormTimeOut.addEventListener('change', onTimeOutChange);
adFormType.addEventListener('change', onFormTypeChange);
adFormCapacity.addEventListener('change', onFormCapacityChange);
adFormRoomNumber.addEventListener('change', onFormCapacityChange);
