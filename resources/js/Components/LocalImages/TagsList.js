"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TagsList = function (_a) {
    var tags = _a.tags;
    return (react_1.default.createElement(react_1.default.Fragment, null, tags.map(function (tag) { return (react_1.default.createElement("span", { key: tag.id, className: 'px-2 text-xs text-gray-800\n                                   bg-yellow-100 mx-1\n                                   border border-yellow-500 rounded' }, tag.title)); })));
};
exports.default = TagsList;
//# sourceMappingURL=TagsList.js.map