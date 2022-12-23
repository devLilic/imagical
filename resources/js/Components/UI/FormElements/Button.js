"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'submit' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, processing = _a.processing, children = _a.children, onClick = _a.onClick;
    return (react_1.default.createElement("button", { type: type, className: "inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ".concat(processing && 'opacity-25', " ") + className, disabled: processing, onClick: onClick }, children));
};
exports.default = Button;
//# sourceMappingURL=Button.js.map