'use strict';
(function () {
  var roomCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var addressField = document.querySelector('#address');
  var fieldsets = window.map.form.querySelectorAll('fieldset');

  var apartmentTypeToPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var customValidityMessage = '';
  var titleInput = window.map.form.querySelector('#title');
  var priceInput = window.map.form.querySelector('#price');
  var timeInInput = window.map.form.querySelector('#timein');
  var timeOutInput = window.map.form.querySelector('#timeout');
  var apartmentType = window.map.form.querySelector('#type');

  addressField.readOnly = true;
  initHandlers();
  setPriceInputMinAttr();

  function initHandlers() {
    titleInput.addEventListener('input', onTitleInputChange);
    priceInput.addEventListener('input', onPriceInputChange);
    apartmentType.addEventListener('change', onApartmentTypeChange);
    timeInInput.addEventListener('change', onTimeInInputChange);
    timeOutInput.addEventListener('change', onTimeOutInputChange);
    window.map.form.addEventListener('submit', onFormSubmit);
  }

  function checkPriceInputValidity(input) {
    if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
      customValidityMessage = 'Стоимость не может быть ниже ' + priceInput.min + ' и выше 1 000 000 руб.';
    } else if (input.validity.valueMissing) {
      customValidityMessage = 'Поле обязательно к заполнению';
    } else {
      customValidityMessage = '';
    }
    input.setCustomValidity(customValidityMessage);
  }

  function checkTitleInputValidity(input) {
    if (input.validity.tooShort || input.validity.tooLong) {
      customValidityMessage = 'Поле должно содержать от 30 до 100 символов';
    } else if (input.validity.valueMissing) {
      customValidityMessage = 'Поле обязательно к заполнению';
    } else {
      customValidityMessage = '';
    }
    input.setCustomValidity(customValidityMessage);
  }

  var checkRoom = function () {
    var roomNumberValue = parseInt(roomNumber.value, 10);
    var roomCapacityValue = parseInt(roomCapacity.value, 10);
    if (roomNumberValue < roomCapacityValue || roomNumberValue !== 100 && roomCapacityValue === 0) {
      roomCapacity.setCustomValidity('Слишком мало комнат.');
    } else if (roomNumberValue === 100 && roomCapacityValue !== 0) {
      roomCapacity.setCustomValidity('Вы уверены?');
    } else {
      roomCapacity.setCustomValidity('');
    }
  };
  roomNumber.addEventListener('change', function () {
    checkRoom();
  });
  roomCapacity.addEventListener('change', function () {
    checkRoom();
  });

  function clearFormFields() {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].value = '';
    }
  }

  function onFormSubmit(evt) {
    sendData(evt);
  }

  function sendData(evt) {
    window.backend.upload(new FormData(evt.currentTarget), onPostDataSuccess, onPostDataError);
    evt.preventDefault();
  }

  function onPostDataSuccess() {
    clearFormFields();
  }

  function onPostDataError() {

  }

  function onTimeInInputChange(evt) {
    matchTimeInAndOut(evt.target, timeOutInput);
  }

  function onTimeOutInputChange(evt) {
    matchTimeInAndOut(evt.target, timeInInput);
  }

  function matchTimeInAndOut(changedInput, inputToChange) {
    inputToChange.value = changedInput.value;
  }

  function onApartmentTypeChange() {
    setPriceInputPlaceholder();
    setPriceInputMinAttr();
  }

  function onTitleInputChange(evt) {
    checkTitleInputValidity(evt.target);
  }

  function onPriceInputChange(evt) {
    checkPriceInputValidity(evt.target);
  }

  function setPriceInputMinAttr() {
    priceInput.min = apartmentTypeToPriceMap[apartmentType.value];
  }

  function setPriceInputPlaceholder() {
    priceInput.placeholder = apartmentTypeToPriceMap[apartmentType.value];
  }

})();
