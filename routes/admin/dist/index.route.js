"use strict";
exports.__esModule = true;
var system_1 = require("../../config/system");
var dashboard_route_1 = require("./dashboard.route");
var topic_route_1 = require("./topic.route");
var song_route_1 = require("./song.route");
var upload_route_1 = require("./upload.route");
var adminRoute = function (app) {
    var PATH_AMIN = "/" + system_1.systemConfig.prefixAdmin;
    app.use(PATH_AMIN + "/dashboard", dashboard_route_1.dashboardRoute);
    app.use(PATH_AMIN + "/topics", topic_route_1.topicRoute);
    app.use(PATH_AMIN + "/songs", song_route_1.songRoute);
    app.use(PATH_AMIN + "/upload", upload_route_1.uploadRoute);
};
exports["default"] = adminRoute;
