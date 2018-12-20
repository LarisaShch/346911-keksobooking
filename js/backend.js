'use strict';
(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS = 200;

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    window.xhr = xhr;
    xhr.responseType = 'json';

    xhr.open('GET', GET_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        var dataArray = xhr.response;
        window.dataArray = dataArray;
        window.dataArrayCopy = dataArray.slice();
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send();
  };
  window.backend = {
    load: load,
    upload: upload
  };

})();
