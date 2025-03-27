"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: { type: String },
});
const AdminModel = mongoose_1.default.model('Admin', AdminSchema, 'admins');
exports.default = AdminModel;
//# sourceMappingURL=admin.model.js.map