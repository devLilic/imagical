"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Label = function (_a) {
    var forInput = _a.forInput, value = _a.value, className = _a.className, children = _a.children;
    return (react_1.default.createElement("label", { htmlFor: forInput, className: "block font-medium text-sm text-gray-700 " + className }, value ? value : children));
};
exports.default = Label;
//# sourceMappingURL=Label.js.map