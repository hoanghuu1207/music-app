"use strict";
exports.__esModule = true;
var topic_route_1 = require("./topic.route");
var song_route_1 = require("./song.route");
var favorite_song_route_1 = require("./favorite-song.route");
var search_route_1 = require("./search.route");
var clientRoute = function (app) {
    app.use("/topics", topic_route_1.topicRoute);
    app.use("/songs", song_route_1.songRoute);
    app.use("/favorite-songs", favorite_song_route_1.favoriteSongRoute);
    app.use("/search", search_route_1.searchRoute);
};
exports["default"] = clientRoute;
