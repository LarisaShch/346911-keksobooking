'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formSpace = form.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filterSelector = filtersForm.querySelectorAll('.map__filter');
  var filterFeatures = filtersForm.querySelector('fieldset');

  var objectsData = {};

  window.backend.getData(getDataSuccess, getDataError);

  function getDataSuccess(data) {
    objectsData = data;
  }

  function getDataError(data) {
    renderErrorMessage(data);
  }

  function renderErrorMessage(data) {
    document.querySelector('.map').textContent = data;
  }

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
  var drawPins = function () {
    var map = document.querySelector('.map__pins');
    for (var i = 0; i < window.data.OBJ_QUANTITY; i++) {
      map.appendChild(generatePin(objectsData[i]));
    }
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
    drawPins(window.data.arrList);
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      window.card.addShowCard(mapPin[i], window.data.arrList[i - 1]);
    }
  });
  generatePin(window.data.objList);

  window.pin = {
    formSpace: formSpace,
    filterSelector: filterSelector,
    pinButton: pinButton,
    map: map,
    form: form
  };

})();
