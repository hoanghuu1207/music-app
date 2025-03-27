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
exports.login = exports.register = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const system_1 = require("../config/system");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            user.password = bcrypt_1.default.hashSync(user.password, salt);
            yield admin_model_1.default.create(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.register = register;
function login(user, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield admin_model_1.default.findOne({ email: user.email });
            if (!foundUser) {
                res.redirect(`/${system_1.systemConfig.prefixAdmin}/auth/login`);
                throw new Error("Email not correct");
            }
            const isMatch = bcrypt_1.default.compareSync(user.password, foundUser.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(), email: foundUser.email }, process.env.SECRET_KEY, {
                    expiresIn: '2 days',
                });
                res.cookie("token", token, {
                    maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true
                });
                return { user: { _id: foundUser._id, email: foundUser.email }, token: token };
            }
            else {
                res.redirect(`/${system_1.systemConfig.prefixAdmin}/auth/login`);
                throw new Error('Password is not correct');
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
//# sourceMappingURL=auth.service.js.map