"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ValidationErrors = function (_a) {
    var errors = _a.errors;
    return (Object.keys(errors).length > 0 && (react_1.default.createElement("div", { className: "mb-4" },
        react_1.default.createElement("ul", { className: "mt-3 list-none list-inside text-sm text-red-600" }, Object.keys(errors).map(function (key, index) {
            return react_1.default.createElement("li", { key: index }, errors[key]);
        })))));
};
exports.default = ValidationErrors;
//# sourceMappingURL=ValidationErrors.js.map