'use strict';
//  drag-n-drop
(function () {
  var LEFT_LIMIT = 130;
  var RIGHT_LIMIT = 630;
  var LEFT_GAP_VALUE = 32;
  var TOP_GAP_VALUE = 84;
  var form = document.querySelector('.ad-form');
  var formSpace = form.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filterSelector = filtersForm.querySelectorAll('.map__filter');
  var filterFeatures = filtersForm.querySelector('fieldset');
  var map = document.querySelector('.map');

  var updateAddressField = function () {
    var address = document.querySelector('#address');
    var buttonX = parseInt(pinButton.style.left.replace('px', ''), window.pin.MIN_VAL) + LEFT_GAP_VALUE;
    var buttonY = parseInt(pinButton.style.top.replace('px', ''), window.pin.MIN_VAL) + TOP_GAP_VALUE;
    address.value = buttonX + ', ' + buttonY;
  };
  var pinButton = document.querySelector('.map__pin--main');
  pinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Активация страницы при нажатии на маркер
    var activatePage = function () {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.pin.enableElements(formSpace);
      window.pin.enableElements(filterSelector);
      filterFeatures.removeAttribute('disabled');
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var offsetTop = pinButton.offsetTop - shift.y;
      if (offsetTop >= LEFT_LIMIT && offsetTop <= RIGHT_LIMIT) {
        pinButton.style.top = offsetTop + 'px';
      }
      var offsetLeft = pinButton.offsetLeft - shift.x;
      if (offsetLeft <= (map.offsetWidth - LEFT_GAP_VALUE) && offsetLeft >= -LEFT_GAP_VALUE) {
        pinButton.style.left = pinButton.offsetLeft - shift.x + 'px';
      }
      updateAddressField();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.backend.load(window.pin.successHandler, alert);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      updateAddressField();
    };

    activatePage();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  window.map = {
    formSpace: formSpace,
    filterSelector: filterSelector,
    filtersForm: filtersForm,
    map: map,
    form: form,
    pinButton: pinButton,
    updateAddressField: updateAddressField,
  };
})();
