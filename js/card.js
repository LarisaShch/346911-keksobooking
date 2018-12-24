'use strict';
(function () {
  var KEY_COD_ESC = 'Escape';
  var fillFeatures = function (features, card) {
    features.innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      var cardFeaturesItem = document.createElement('li');
      cardFeaturesItem.classList.add('popup__feature');
      cardFeaturesItem.classList.add('popup__feature--' + card.offer.features[i]);
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

    var renderType = function () {
      switch (card.offer.type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
      }
      return card.offer.type;
    };
    type.textContent = renderType(card.offer.type);

    var room = element.querySelector('.popup__text--capacity');
    room.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

    var check = element.querySelector('.popup__text--time');
    check.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var features = element.querySelector('.popup__features');
    if (card.offer.features.length) {
      fillFeatures(features, card);
    } else {
      hidenElement(features);
    }

    var description = element.querySelector('.popup__description');
    description.textContent = card.offer.description;

    var photoCard = element.querySelector('.popup__photos');
    if ('photos' in card.offer && card.offer.photos.length > 0) {
      var photo = photoCard.querySelector('img');
      photo.src = card.offer.photos[0];
      for (var i = 1; i < card.offer.photos.length; i++) {
        var next = photo.cloneNode(true);
        next.src = card.offer.photos[i];
        photoCard.appendChild(next);
      }
    } else {
      photoCard.remove();
    }

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = card.author.avatar;

    return element;
  };
  var hidenElement = function (element) {
    element.classList.add('hidden');
  };

  var renderCard = function (card) {
    var map = document.querySelector('.map');
    var containerBefore = document.querySelector('.map__filters-container');
    var advCard = generateCard(card);
    deleteMap();
    map.insertBefore(advCard, containerBefore);
    var close = document.querySelector('.popup__close');
    var escapeHandler = function (evt) {
      if (evt.code === KEY_COD_ESC) {
        deleteMap();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    close.addEventListener('click', function (evt) {
      evt.preventDefault();
      deleteMap();
    });
    document.addEventListener('keydown', escapeHandler);
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

  disableElements(window.map.formSpace);
  disableElements(window.map.filterSelector);

  window.card = {
    addShowCard: addShowCard,
    disableElements: disableElements,
    KEY_COD_ESC: KEY_COD_ESC
  };
})();
