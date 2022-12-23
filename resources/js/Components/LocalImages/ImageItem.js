"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TagsList_1 = require("@/Components/LocalImages/TagsList");
var ImageItem = function (_a) {
    var image = _a.image, selectImage = _a.selectImage;
    return (react_1.default.createElement("div", { className: 'text-center' },
        react_1.default.createElement("img", { src: image.url, onClick: selectImage, className: 'cursor-pointer mb-1' }),
        react_1.default.createElement("div", { className: 'flex flex-wrap justify-center' },
            react_1.default.createElement(TagsList_1.default, { tags: image.tags }))));
};
exports.default = ImageItem;
//# sourceMappingURL=ImageItem.js.map