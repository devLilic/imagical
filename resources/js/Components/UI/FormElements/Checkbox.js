"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@material-tailwind/react");
var Checkbox = function (_a) {
    var id = _a.id, isChecked = _a.isChecked, value = _a.value, onChange = _a.onChange;
    return (react_1.default.createElement(react_2.Checkbox, { color: "blue", ripple: false, className: 'w-4 h-4', id: id, checked: isChecked, value: value, onChange: onChange }));
};
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map