"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Input = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'text' : _b, name = _a.name, value = _a.value, className = _a.className, autoComplete = _a.autoComplete, required = _a.required, isDisabled = _a.isDisabled, isFocused = _a.isFocused, handleChange = _a.handleChange, placeholder = _a.placeholder;
    var input = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return (react_1.default.createElement("div", { className: "flex flex-row items-start" },
        react_1.default.createElement("input", { type: type, name: name, value: value, placeholder: placeholder, className: "w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" +
                className, disabled: isDisabled, ref: input, autoComplete: autoComplete, required: required, onChange: function (e) { return handleChange(e); } })));
};
exports.default = Input;
//# sourceMappingURL=Input.js.map