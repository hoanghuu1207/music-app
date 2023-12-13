"use strict";
exports.__esModule = true;
exports.topicRoute = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/admin/topic.controller");
router.get("/", controller.index);
exports.topicRoute = router;
