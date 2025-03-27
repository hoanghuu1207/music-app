"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const home_route_1 = require("./home.route");
const clientRoute = (app) => {
    app.use(`/`, home_route_1.homeRoute);
    app.use(`/topics`, topic_route_1.topicRoute);
    app.use(`/songs`, song_route_1.songRoute);
    app.use(`/favorite-songs`, favorite_song_route_1.favoriteSongRoute);
    app.use(`/search`, search_route_1.searchRoute);
};
exports.default = clientRoute;
//# sourceMappingURL=index.route.js.map