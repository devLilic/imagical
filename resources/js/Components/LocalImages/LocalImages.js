"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Loading_1 = require("@/Components/UI/Svg/Loading");
var ImagesList_1 = require("@/Components/LocalImages/ImagesList");
var LocalImages = function (_a) {
    var images = _a.images, title = _a.title, onSelectImage = _a.onSelectImage, loading = _a.loading, className = _a.className;
    return (react_1.default.createElement("div", { className: 'px-2' }, images.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, title),
        loading ? react_1.default.createElement(Loading_1.default, null) :
            react_1.default.createElement(ImagesList_1.default, { className: className, images: images, onSelectImage: onSelectImage })))));
};
exports.default = LocalImages;
//# sourceMappingURL=LocalImages.js.map