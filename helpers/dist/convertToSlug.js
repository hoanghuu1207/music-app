"use strict";
exports.__esModule = true;
exports.convertToSlug = void 0;
var unidecode_1 = require("unidecode");
exports.convertToSlug = function (text) {
    var unidecodeText = unidecode_1["default"](text.trim());
    var slug = unidecodeText.replace(/\s+/g, "-"); //regular expression
    return slug;
};
