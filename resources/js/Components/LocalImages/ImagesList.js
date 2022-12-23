"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ImageItem_1 = require("@/Components/LocalImages/ImageItem");
var ImagesList = function (_a) {
    var images = _a.images, onSelectImage = _a.onSelectImage, className = _a.className;
    return (react_1.default.createElement("div", { className: "pr-3 overflow-y-scroll grid gap-y-3 gap-x-3 ".concat(className) }, images.map(function (image) { return react_1.default.createElement(ImageItem_1.default, { key: image.id, image: image, selectImage: onSelectImage && onSelectImage.bind(null, image.url) }); })));
};
exports.default = ImagesList;
//# sourceMappingURL=ImagesList.js.map