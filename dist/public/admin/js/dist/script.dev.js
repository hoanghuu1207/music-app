"use strict";

var uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  var uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  var uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", function (e) {
    if (e.target.files.length) {
      var image = URL.createObjectURL(e.target.files[0]);
      uploadImagePreview.src = image;
    }
  });
}

var uploadAudio = document.querySelector("[upload-audio]");

if (uploadAudio) {
  var uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  var uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  var source = uploadAudio.querySelector("source");
  uploadAudioInput.addEventListener("change", function (e) {
    if (e.target.files.length) {
      var audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}