"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@material-tailwind/react");
var Dialog = function (_a) {
    var open = _a.open, _b = _a.size, size = _b === void 0 ? "md" : _b, handleDialog = _a.handleDialog, title = _a.title, children = _a.children, _c = _a.closeBtn, closeBtn = _c === void 0 ? false : _c, _d = _a.confirmBtn, confirmBtn = _d === void 0 ? false : _d, _e = _a.cancelBtn, cancelBtn = _e === void 0 ? false : _e, _f = _a.confirmText, confirmText = _f === void 0 ? '' : _f, confirmAction = _a.confirmAction;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_2.Dialog, { open: open, size: size, handler: handleDialog },
            react_1.default.createElement(react_2.DialogHeader, null, title),
            react_1.default.createElement(react_2.DialogBody, { divider: true }, children),
            react_1.default.createElement(react_2.DialogFooter, null,
                closeBtn &&
                    react_1.default.createElement(react_2.Button, { variant: "text", color: "red", onClick: handleDialog, className: "mr-1" },
                        react_1.default.createElement("span", null, "Close")),
                cancelBtn &&
                    react_1.default.createElement(react_2.Button, { variant: "text", color: "red", onClick: handleDialog, className: "mr-1" },
                        react_1.default.createElement("span", null, "Cancel")),
                confirmBtn &&
                    react_1.default.createElement(react_2.Button, { variant: "gradient", color: "green", onClick: confirmAction },
                        react_1.default.createElement("span", null, confirmText ? confirmText : 'Confirm'))))));
};
exports.default = Dialog;
//# sourceMappingURL=Dialog.js.map