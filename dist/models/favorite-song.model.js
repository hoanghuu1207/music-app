"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteSongSchema = new mongoose_1.default.Schema({
    songId: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const FavoriteSong = mongoose_1.default.model("FavoriteSong", favoriteSongSchema, "favorite-songs");
exports.default = FavoriteSong;
//# sourceMappingURL=favorite-song.model.js.map