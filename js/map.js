'use strict';
//  drag-n-drop
var mainPin = document.querySelector('.map__pin--main');
var mainPinWidth = mainPin.offsetWidth;
var mainPinStartHeight = mainPin.offsetHeight;
var mainPinHeight = mainPinStartHeight + 22;
var adress = document.querySelector('#address');
var mapWidth = window.pin.map.offsetWidth;

var pinsLimits = {
  MIN_Y: 130 - mainPinHeight,
  MAX_Y: 630,
  MIN_X: 0 - mainPinWidth / 2,
  MAX_X: mapWidth - mainPinWidth / 2
};

var getLimit = function (value, min, max) {
  if (value < min) {
    value = min;
  }

  if (value > max) {
    value = max;
  }

  return value;
};


mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var pinCoords = function () {
      var newCoords = {};
      newCoords.x = getLimit(mainPin.offsetLeft - coord.x, pinsLimits.MIN_X, pinsLimits.MAX_X);
      newCoords.y = getLimit(mainPin.offsetTop - coord.y, pinsLimits.MIN_Y, pinsLimits.MAX_Y);

      return newCoords;
    };

    var coord = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };

    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var resultCoord = pinCoords();

    mainPin.style.top = resultCoord.y + 'px';
    mainPin.style.left = resultCoord.x + 'px';
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
  mainPin.addEventListener('mouseup', window.pin.pinButton);
});


