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
exports.result = void 0;
var convertToSlug_1 = require("../../helpers/convertToSlug");
var song_model_1 = require("../../models/song.model");
var singer_model_1 = require("../../models/singer.model");
//[GET] /search/:type
exports.result = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, keyword, newSongs, keywordRegex, stringSlug, stringSlugRegex, songs, _i, songs_1, song, infoSinger;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.params.type;
                keyword = "" + req.query.keyword;
                newSongs = [];
                if (!keyword) return [3 /*break*/, 5];
                keywordRegex = new RegExp(keyword, "i");
                stringSlug = convertToSlug_1.convertToSlug(keyword);
                stringSlugRegex = new RegExp(stringSlug, "i");
                return [4 /*yield*/, song_model_1["default"].find({
                        $or: [
                            { title: keywordRegex },
                            { slug: stringSlugRegex }
                        ],
                        deleted: false
                    })];
            case 1:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 2;
            case 2:
                if (!(_i < songs_1.length)) return [3 /*break*/, 5];
                song = songs_1[_i];
                return [4 /*yield*/, singer_model_1["default"].findOne({
                        _id: song.singerId,
                        deleted: false
                    })];
            case 3:
                infoSinger = _a.sent();
                // song["infoSinger"] = infoSinger;
                newSongs.push({
                    // id: song.id,
                    title: song.title,
                    avatar: song.avatar,
                    like: song.like,
                    slug: song.slug,
                    infoSinger: {
                        fullName: infoSinger.fullName
                    }
                });
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                switch (type) {
                    case "result":
                        res.render("client/pages/search/result", {
                            titlePage: "K\u1EBFt qu\u1EA3: " + keyword,
                            keyword: keyword,
                            songs: newSongs
                        });
                        break;
                    case "suggest":
                        res.json({
                            code: 200,
                            message: "Thành công",
                            songs: newSongs
                        });
                        break;
                    default:
                        break;
                }
                return [2 /*return*/];
        }
    });
}); };
