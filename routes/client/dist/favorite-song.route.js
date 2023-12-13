"use strict";
exports.__esModule = true;
exports.favoriteSongRoute = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/favorite-song.controller");
router.get("/", controller.index);
exports.favoriteSongRoute = router;
