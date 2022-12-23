"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Card = function (props) {
    return (react_1.default.createElement("div", { className: "my-3 rounded-sm rounded" },
        react_1.default.createElement("div", { className: "border border-blue-300 rounded-sm" }, props.children)));
};
exports.default = Card;
//# sourceMappingURL=Card.js.map