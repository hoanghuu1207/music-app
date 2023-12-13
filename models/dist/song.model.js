"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose_slug_updater_1 = require("mongoose-slug-updater");
mongoose_1["default"].plugin(mongoose_slug_updater_1["default"]);
var songSchema = new mongoose_1["default"].Schema({
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: {
        type: Number,
        "default": 0
    },
    listen: {
        type: Number,
        "default": 0
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        "default": false
    },
    deletedAt: Date
}, {
    timestamps: true
});
var Song = mongoose_1["default"].model("Song", songSchema, "songs");
exports["default"] = Song;
