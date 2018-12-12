'use strict';
(function () {
  var roomCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

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
})();
