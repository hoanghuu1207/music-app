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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongs = yield favorite_song_model_1.default.find({
        deleted: false
    });
    for (const favoriteSong of favoriteSongs) {
        const infoSong = yield song_model_1.default.findOne({
            _id: favoriteSong.songId,
            deleted: false
        });
        const infoSinger = yield singer_model_1.default.findOne({
            _id: infoSong.singerId,
            deleted: false
        });
        favoriteSong["infoSong"] = infoSong;
        favoriteSong["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favorite-songs/index", {
        titlePage: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
});
exports.index = index;
//# sourceMappingURL=favorite-song.controller.js.map