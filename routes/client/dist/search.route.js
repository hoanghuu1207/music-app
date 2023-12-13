"use strict";
exports.__esModule = true;
exports.searchRoute = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/search.controller");
router.get("/:type", controller.result);
exports.searchRoute = router;
