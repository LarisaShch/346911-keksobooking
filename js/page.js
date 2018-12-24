'use strict';

(function () {
  var MAIN_PIN_TOP = 375;
  var MAIN_PIN_LEFT = 570;
  var DEFAULT_PRICE_PLACEHOLDER = 1000;
  var DEFAULT_PRICE_MIN = 1000;
  var resetPage = function () {
    var filterSelector = window.map.filtersForm.querySelectorAll('.map__filter');
    var featuresFilter = window.map.filtersForm.querySelectorAll('.map__features');
    var priceOption = document.querySelector('#price');
    var pinButton = document.querySelector('.map__pin--main');
    window.pin.clearMap();
    window.map.map.classList.add('map--faded');
    window.map.form.classList.add('ad-form--disabled');
    window.card.disableElements(window.map.formSpace);
    window.card.disableElements(filterSelector);
    window.card.disableElements(featuresFilter);
    window.map.form.reset();
    window.map.filtersForm.reset();
    window.photos.clearAvatar();
    window.photos.clearPhotos();
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
