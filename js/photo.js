'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SRC = 'img/muffin-grey.svg';
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoPreviewContainer = document.querySelector('.ad-form__photo-container');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');

  var loadPhoto = function (photoFile, onLoad) {
    var photoName = photoFile.name.toLowerCase();
    var matches = TYPES.some(function (it) {
      return photoName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });
      reader.readAsDataURL(photoFile);
    }
  };

  var addPhoto = function (photoData) {
    var photoPreviewList = document.createElement('div');
    photoPreviewList.classList.add('ad-form__photo');
    var image = document.createElement('img');
    image.src = photoData;
    image.width = 70;
    image.height = 70;
    photoPreviewList.appendChild(image);
    photoPreviewContainer.appendChild(photoPreviewList);
  };

  avatarFileChooser.addEventListener('change', function () {
    loadPhoto(avatarFileChooser.files[0], function (avatarData) {
      avatarPreview.src = avatarData;
    });
  });

  photoFileChooser.addEventListener('change', function () {
    clearPhotos();
    for (var j = 0; j < photoFileChooser.files.length; j++) {
      loadPhoto(photoFileChooser.files[j], addPhoto);
    }
  });

  var clearPhotos = function () {
    var loadedPhotos = document.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < loadedPhotos.length; i++) {
      photoPreviewContainer.removeChild(loadedPhotos[i]);
    }
  };
  var clearAvatar = function () {
    avatarPreview.src = AVATAR_SRC;
  };

  window.photos = {
    clearPhotos: clearPhotos,
    clearAvatar: clearAvatar
  };

})();
