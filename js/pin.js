'use strict';
(function () {
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
    button.style.left = advertisement.location.x - 25 + 'px';
    button.style.top = advertisement.location.y - 70 + 'px';
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
    var template = document.querySelector('#pin');
    var mapPins = document.querySelector('.map__pins');
    var allPins = document.querySelectorAll('.map__pin');
    if (allPins.length === 1) {
      for (var i = 0; i < advWithOffer.length; i++) {
        var pin = generatePin(advWithOffer[i], template);
        mapPins.appendChild(pin);
      }
    }
    var mapPin = document.querySelectorAll('.map__pin');
    for (i = 1; i < mapPin.length; i++) {
      window.card.addShowCard(mapPin[i], advWithOffer[i - 1]);
    }
  };


  window.pin = {
    drawPins: drawPins,
    enableElements: enableElements
  };

})();
