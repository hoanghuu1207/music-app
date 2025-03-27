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
exports.result = void 0;
const convertToSlug_1 = require("../../helpers/convertToSlug");
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ],
            deleted: false
        }).limit(5);
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId,
                deleted: false
            });
            newSongs.push({
                title: song.title,
                avatar: song.avatar,
                like: song.like,
                slug: song.slug,
                infoSinger: {
                    fullName: infoSinger.fullName
                }
            });
        }
        const singers = yield singer_model_1.default.find({
            $or: [
                { fullName: keywordRegex },
                { slug: stringSlugRegex }
            ],
            deleted: false
        }).limit(5);
        for (const singer of singers) {
            const songs = yield song_model_1.default.find({
                singerId: singer.id,
                deleted: false
            }).limit(5);
            for (const song of songs) {
                const exists = newSongs.some(existingSong => existingSong.slug === song.slug);
                if (!exists) {
                    newSongs.push({
                        title: song.title,
                        avatar: song.avatar,
                        like: song.like,
                        slug: song.slug,
                        infoSinger: {
                            fullName: singer.fullName
                        }
                    });
                }
            }
        }
    }
    switch (type) {
        case "result":
            res.render("client/pages/search/result", {
                titlePage: `Kết quả: ${keyword}`,
                keyword,
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
});
exports.result = result;
//# sourceMappingURL=search.controller.js.map