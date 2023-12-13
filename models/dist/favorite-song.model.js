"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var favoriteSongSchema = new mongoose_1["default"].Schema({
    // userId: String,
    songId: String,
    deleted: {
        type: Boolean,
        "default": false
    },
    deletedAt: Date
}, {
    timestamps: true
});
var FavoriteSong = mongoose_1["default"].model("FavoriteSong", favoriteSongSchema, "favorite-songs");
exports["default"] = FavoriteSong;
