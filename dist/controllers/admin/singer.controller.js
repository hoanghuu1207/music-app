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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const system_1 = require("../../config/system");
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/singers/index", {
        titlePage: "Quản lý ca sĩ",
        singers
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        titlePage: "Thêm mới ca sĩ"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const singer = {
        fullName: req.body.fullName,
        avatar: avatar,
        status: req.body.status
    };
    const newSinger = new singer_model_1.default(singer);
    yield newSinger.save();
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singer = yield singer_model_1.default.findById(req.params.id);
    res.render("admin/pages/singers/edit", {
        titlePage: "Chỉnh sửa thông tin ca sĩ",
        singer
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = {
        fullName: req.body.fullName,
        status: req.body.status
    };
    if (req.body.avatar) {
        singer["avatar"] = req.body.avatar[0];
    }
    yield singer_model_1.default.updateOne({
        _id: id
    }, singer);
    res.redirect("back");
});
exports.editPatch = editPatch;
//# sourceMappingURL=singer.controller.js.map