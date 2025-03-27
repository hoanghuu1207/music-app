"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const singer_route_1 = require("./singer.route");
const upload_route_1 = require("./upload.route");
const auth_route_1 = require("./auth.route");
const auth_middleware_1 = require("../../middlewares/admin/auth.middleware");
const adminRoute = (app) => {
    const PATH_ADMIN = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, auth_middleware_1.auth, dashboard_route_1.dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, auth_middleware_1.auth, topic_route_1.topicRoute);
    app.use(`${PATH_ADMIN}/songs`, auth_middleware_1.auth, song_route_1.songRoute);
    app.use(`${PATH_ADMIN}/singers`, auth_middleware_1.auth, singer_route_1.singerRoute);
    app.use(`${PATH_ADMIN}/upload`, auth_middleware_1.auth, upload_route_1.uploadRoute);
    app.use(`${PATH_ADMIN}/auth`, auth_route_1.authRoute);
};
exports.default = adminRoute;
//# sourceMappingURL=index.route.js.map