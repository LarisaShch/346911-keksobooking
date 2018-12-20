'use strict';

(function () {
  var MAIN_PIN_TOP = 375;
  var MAIN_PIN_LEFT = 570;
  var DEFAULT_PRICE_PLACEHOLDER = 1000;
  var DEFAULT_PRICE_MIN = 1000;
  var resetPage = function () {
    var map = document.querySelector('.map');
    var form = document.querySelector('.ad-form');
    var formSpace = form.querySelectorAll('fieldset');
    var filtersForm = document.querySelector('.map__filters');
    var filterSelector = filtersForm.querySelectorAll('.map__filter');
    var featuresFilter = filtersForm.querySelectorAll('.map__features');
    var priceOption = document.querySelector('#price');
    var pinButton = document.querySelector('.map__pin--main');
    window.pin.clearMap();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.card.disableElements(formSpace);
    window.card.disableElements(filterSelector);
    window.card.disableElements(featuresFilter);
    form.reset();
    filtersForm.reset();
    priceOption.placeholder = DEFAULT_PRICE_PLACEHOLDER;
    priceOption.min = DEFAULT_PRICE_MIN;
    pinButton.style.top = MAIN_PIN_TOP + 'px';
    pinButton.style.left = MAIN_PIN_LEFT + 'px';
    window.map.updateAddressField();
  };
  window.page = {
    resetPage: resetPage
  };
})();
