"use strict";

var aplayer = document.querySelector("#aplayer");

if (aplayer) {
  var dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  var dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  var ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar,
      theme: '#eed0c2',
      lrc: dataSong.lyrics
    }],
    autoplay: true
  });
  var avatar = document.querySelector(".singer-detail .inner-avatar");
  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });
  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });
  ap.on('ended', function () {
    var link = "/songs/listen/".concat(dataSong._id);
    var option = {
      method: "PATCH"
    };
    fetch(link, option).then(function (res) {
      return res.json();
    }).then(function (data) {
      var listenSpan = document.querySelector(".singer-detail .inner-listen span");
      listenSpan.innerHTML = "".concat(data.listen, " l\u01B0\u1EE3t nghe");
    });
  });
}

var buttonLike = document.querySelector("[button-like]");

if (buttonLike) {
  buttonLike.addEventListener("click", function () {
    var idSong = buttonLike.getAttribute("button-like");
    var isActive = buttonLike.classList.contains("active");
    var typeLike = isActive ? "dislike" : "like";
    var link = "/songs/like/".concat(typeLike, "/").concat(idSong);
    var option = {
      method: "PATCH"
    };
    fetch(link, option).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.code == 200) {
        var span = buttonLike.querySelector("span");
        span.innerHTML = "".concat(data.like, " th\xEDch");
        buttonLike.classList.toggle("active");
      }
    });
  });
}

var buttonFavoriteSongs = document.querySelectorAll("[button-favorite]");

if (buttonFavoriteSongs.length > 0) {
  buttonFavoriteSongs.forEach(function (buttonFavoriteSong) {
    buttonFavoriteSong.addEventListener("click", function () {
      var idSong = buttonFavoriteSong.getAttribute("button-favorite");
      var isActive = buttonFavoriteSong.classList.contains("active");
      var typeFavorite = isActive ? "unfavorite" : "favorite";
      var link = "/songs/favorite-song/".concat(typeFavorite, "/").concat(idSong);
      var option = {
        method: "PATCH"
      };
      fetch(link, option).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.code == 200) {
          buttonFavoriteSong.classList.toggle("active");
        }
      });
    });
  });
}

var boxSearch = document.querySelector(".box-search");

if (boxSearch) {
  var input = boxSearch.querySelector("input[name='keyword']");
  var boxSuggest = boxSearch.querySelector(".inner-suggest");
  input.addEventListener("keyup", function () {
    var keyword = input.value;
    var link = "/search/suggest?keyword=".concat(keyword);
    fetch(link).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.code == 200) {
        var songs = data.songs;

        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          var htmls = songs.map(function (song) {
            return "\n                <a class=\"inner-item\" href=\"/songs/detail/".concat(song.slug, "\">\n                  <div class=\"inner-image\"><img src=\"").concat(song.avatar, "\" /></div>\n                  <div class=\"inner-info\">\n                      <div class=\"inner-title\">").concat(song.title, "</div>\n                      <div class=\"inner-singer\"><i class=\"fa-solid fa-microphone-lines\"></i> ").concat(song.infoSinger.fullName, "</div>\n                  </div>\n                </a>\n              ");
          });

          if (htmls.length === 0) {
            htmls.push("\n                <div>Not Found</div>\n              ");
          }

          var boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      }
    });
  });
}