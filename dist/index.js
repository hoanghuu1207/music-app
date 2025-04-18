"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const database = __importStar(require("./config/database"));
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_route_1 = __importDefault(require("./routes/client/index.route"));
const index_route_2 = __importDefault(require("./routes/admin/index.route"));
const system_1 = require("./config/system");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
database.connect();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'public', 'tinymce')));
app.use(express_1.default.json());
app.use((0, method_override_1.default)("_method"));
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "views"));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        titlePage: "404 Not Found"
    });
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=index.js.map