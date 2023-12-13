"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
var topic_model_1 = require("../../models/topic.model");
var song_model_1 = require("../../models/song.model");
var singer_model_1 = require("../../models/singer.model");
var favorite_song_model_1 = require("../../models/favorite-song.model");
// [GET] /songs/:slugTopic
exports.list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topic, songs, _i, songs_1, song, infoSinger;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1["default"].findOne({
                    slug: req.params.slugTopic,
                    status: "active",
                    deleted: false
                })];
            case 1:
                topic = _a.sent();
                return [4 /*yield*/, song_model_1["default"].find({
                        topicId: topic.id,
                        status: "active",
                        deleted: false
                    }).select("avatar title slug singerId like")];
            case 2:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 3;
            case 3:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                song = songs_1[_i];
                return [4 /*yield*/, singer_model_1["default"].findOne({
                        _id: song.singerId,
                        status: "active",
                        deleted: false
                    })];
            case 4:
                infoSinger = _a.sent();
                song["infoSinger"] = infoSinger;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.render("client/pages/songs/list", {
                    titlePage: topic.title,
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
// [GET] /songs/detail/:slugSong
exports.detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slugSong, song, singer, topic, favoriteSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slugSong = req.params.slugSong;
                return [4 /*yield*/, song_model_1["default"].findOne({
                        slug: slugSong,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, singer_model_1["default"].findOne({
                        _id: song.singerId,
                        deleted: false,
                        status: "active"
                    }).select("fullName")];
            case 2:
                singer = _a.sent();
                return [4 /*yield*/, topic_model_1["default"].findOne({
                        _id: song.topicId,
                        deleted: false,
                        status: "active"
                    }).select("title")];
            case 3:
                topic = _a.sent();
                return [4 /*yield*/, favorite_song_model_1["default"].findOne({
                        songId: song.id
                    })];
            case 4:
                favoriteSong = _a.sent();
                song["isFavoriteSong"] = favoriteSong ? true : false;
                res.render("client/pages/songs/detail", {
                    titlePage: "Chi tiết bài hát",
                    song: song,
                    singer: singer,
                    topic: topic
                });
                return [2 /*return*/];
        }
    });
}); };
// [PATCH] /songs/like/:typeLike/:idSong
exports.like = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var typeLike, idSong, song, newLike;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                typeLike = req.params.typeLike;
                idSong = req.params.idSong;
                return [4 /*yield*/, song_model_1["default"].findOne({
                        _id: idSong,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                song = _a.sent();
                newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
                return [4 /*yield*/, song_model_1["default"].updateOne({
                        _id: idSong
                    }, {
                        like: newLike
                    })];
            case 2:
                _a.sent();
                // like: ["id_user_1", "id_user_2"]
                res.json({
                    code: 200,
                    message: "Cập nhật thành công",
                    like: newLike
                });
                return [2 /*return*/];
        }
    });
}); };
// [PATCH] /songs/favorite-song/:typeFavorite/:idSong
exports.favorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var typeFavorite, idSong, _a, existFavoriteSong, newFavoriteSong;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                typeFavorite = req.params.typeFavorite;
                idSong = req.params.idSong;
                _a = typeFavorite;
                switch (_a) {
                    case "favorite": return [3 /*break*/, 1];
                    case "unfavorite": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, favorite_song_model_1["default"].findOne({
                    songId: idSong
                })];
            case 2:
                existFavoriteSong = _b.sent();
                if (!!existFavoriteSong) return [3 /*break*/, 4];
                newFavoriteSong = new favorite_song_model_1["default"]({
                    //userId
                    songId: idSong
                });
                return [4 /*yield*/, newFavoriteSong.save()];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, favorite_song_model_1["default"].deleteOne({
                    songId: idSong
                })];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8:
                res.json({
                    code: 200,
                    message: "Cập nhật thành công"
                });
                return [2 /*return*/];
        }
    });
}); };
// [PATCH] /songs/listen/:idSong
exports.listen = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idSong, song, listen, newSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idSong = req.params.idSong;
                return [4 /*yield*/, song_model_1["default"].findOne({
                        _id: idSong,
                        deleted: false
                    })];
            case 1:
                song = _a.sent();
                listen = song.listen + 1;
                return [4 /*yield*/, song_model_1["default"].updateOne({
                        _id: idSong
                    }, {
                        listen: listen
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, song_model_1["default"].findOne({
                        deleted: false,
                        _id: idSong
                    })];
            case 3:
                newSong = _a.sent();
                res.json({
                    code: 200,
                    message: "Thành công",
                    listen: newSong.listen
                });
                return [2 /*return*/];
        }
    });
}); };
