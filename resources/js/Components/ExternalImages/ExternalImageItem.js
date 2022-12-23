"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ExternalLink_1 = require("@/Components/UI/Svg/ExternalLink");
var ExternalImageItem = function (_a) {
    var image = _a.image, selectExternalImage = _a.selectExternalImage;
    return (react_1.default.createElement("div", { className: 'border border-gray-500 rounded-sm overflow-hidden text-center flex flex-col items-center justify-between flex-nowrap relative' },
        react_1.default.createElement("img", { src: image.url, onClick: selectExternalImage, className: 'cursor-pointer' }),
        react_1.default.createElement("div", { className: 'absolute top-1 right-1' },
            react_1.default.createElement("a", { target: '_blank', className: 'p-1 bg-transparent block rounded hover:bg-white', href: image.article_url, title: image.site },
                react_1.default.createElement(ExternalLink_1.default, null))),
        react_1.default.createElement("div", { className: 'text-xs' },
            image.width,
            " x ",
            image.height)));
};
exports.default = ExternalImageItem;
//# sourceMappingURL=ExternalImageItem.js.map