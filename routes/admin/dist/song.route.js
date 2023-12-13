"use strict";
exports.__esModule = true;
exports.songRoute = void 0;
var express_1 = require("express");
var multer_1 = require("multer");
var router = express_1.Router();
var upload = multer_1["default"]();
var uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
var controller = require("../../controllers/admin/songs.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
]), uploadCloud.uploadFields, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
]), uploadCloud.uploadFields, controller.editPatch);
exports.songRoute = router;
