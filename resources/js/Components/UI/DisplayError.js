"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DisplayError = function (_a) {
    var error = _a.error;
    return (error &&
        react_1.default.createElement("p", { className: "text-sm text-red-600 bg-red-200 inline-block px-3 py-3 rounded-lg rounded-tl-none rounded-br-none absolute top-0 right-0" }, error));
};
exports.default = DisplayError;
//# sourceMappingURL=DisplayError.js.map