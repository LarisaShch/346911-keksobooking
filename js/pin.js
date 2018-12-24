'use strict';
(function () {
  var PINS_COUNT = 5;
  var LEFT_GAP = 25;
  var TOP_GAP = 70;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var MIN_VAL = 10;

  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeature = document.querySelectorAll('.map__checkbox');
  var loadAdvertisements = [];

  var enableElements = function (element) {
    element.forEach(function (elements) {
      elements.removeAttribute('disabled');
    });
  };

  // DOM-элементы для меток
  var generatePin = function (advertisement) {
    var element = document.querySelector('#pin').content;
    var pin = element.cloneNode(true);
    var button = pin.querySelector('button');
    button.style.left = advertisement.location.x - LEFT_GAP + 'px';
    button.style.top = advertisement.location.y - TOP_GAP + 'px';
    var image = pin.querySelector('img');
    image.src = advertisement.author.avatar;
    image.alt = advertisement.offer.title;
    return pin;
  };
  // Отрисовка
  var drawPins = function (advertisements) {
    var advWithOffer = advertisements.filter(function (item) {
      return 'offer' in item;
    });

    var mapPins = document.querySelector('.map__pins');
    var allPin = document.querySelectorAll('.map__pin');
    if (allPin.length === 1) {
      for (var i = 0; i < advertisements.length; i++) {
        var pin = generatePin(advWithOffer[i]);
        mapPins.appendChild(pin);
      }
    }
    var mapPin = document.querySelectorAll('.map__pin');
    for (i = 1; i < mapPin.length; i++) {
      window.card.addShowCard(mapPin[i], advWithOffer[i - 1]);
    }
  };

  var filterAdvertisement = function (advertisements) {
    var selectedHousingFeatures = [];
    housingFeature.forEach(function (item) {
      if (item.checked) {
        selectedHousingFeatures.push(item.value);
      }
    });
    var advWithOffer = advertisements.filter(function (item) {
      return 'offer' in item;
    });
    if (housingType.value !== 'any') {
      advWithOffer = advWithOffer.filter(function (item) {
        return item.offer.type === housingType.value;
      });
    }
    if (housingPrice.value !== 'any') {
      advWithOffer = advWithOffer.filter(function (item) {
        switch (housingPrice.value) {
          case 'low':
            return item.offer.price < LOW_PRICE;
          case 'middle':
            return item.offer.price >= LOW_PRICE && item.offer.price < HIGH_PRICE;
          case 'high':
            return item.offer.price >= HIGH_PRICE;
        }
        return false;
      });
    }
    if (housingRoom.value !== 'any') {
      advWithOffer = advWithOffer.filter(function (item) {
        return item.offer.rooms === +housingRoom.value;
      });
    }

    if (housingGuests.value !== 'any') {
      advWithOffer = advWithOffer.filter(function (item) {
        return item.offer.guests === parseInt(housingGuests.value, MIN_VAL);
      });
    }
    advWithOffer = advWithOffer.filter(function (item) {
      for (var i = 0; i < selectedHousingFeatures.length; i++) {
        if (item.offer.features.indexOf(selectedHousingFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    });
    return advWithOffer.slice(0, PINS_COUNT);
  };

  var deleteMap = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  };

  var clearMap = function () {
    var allPins = document.querySelectorAll('.map__pin');
    var mapPins = document.querySelector('.map__pins');
    for (var i = 1; i < allPins.length; i++) {
      mapPins.removeChild(allPins[i]);
    }
    deleteMap();
  };
  // Активация фильтров
  var activateFilterForm = function () {
    var filterSelector = filtersForm.querySelectorAll('.map__filter');
    var filterFeatures = filtersForm.querySelector('fieldset');
    enableElements(filterSelector);
    filterFeatures.removeAttribute('disabled');
  };
  var successHandler = function (adv) {
    loadAdvertisements = adv;
    var filtered = filterAdvertisement(loadAdvertisements);
    drawPins(filtered);
    activateFilterForm();
  };

  filtersForm.addEventListener('change', function () {
    window.debounce(function () {
      var filter = filterAdvertisement(loadAdvertisements);
      clearMap();
      drawPins(filter);
    });
  });


  window.pin = {
    drawPins: drawPins,
    enableElements: enableElements,
    successHandler: successHandler,
    clearMap: clearMap,
    MIN_VAL: MIN_VAL
  };
})();
