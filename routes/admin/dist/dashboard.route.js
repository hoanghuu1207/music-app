"use strict";
exports.__esModule = true;
exports.dashboardRoute = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/admin/dashboard.controller");
router.get("/", controller.index);
exports.dashboardRoute = router;
