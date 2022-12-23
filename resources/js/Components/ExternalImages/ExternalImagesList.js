"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@material-tailwind/react");
var ExternalImageItem_1 = require("@/Components/ExternalImages/ExternalImageItem");
var articles_context_1 = require("@/Store/ArticleStore/articles-context");
var images_context_1 = require("@/Store/ImagesStore/images-context");
var ExternalImagesList = function (_a) {
    var selectExternalImage = _a.selectExternalImage;
    var articleCtx = (0, react_1.useContext)(articles_context_1.default);
    var imagesCtx = (0, react_1.useContext)(images_context_1.default);
    var _b = (0, react_1.useState)(imagesCtx.external.images[articleCtx.articleToEdit]), images = _b[0], setImages = _b[1];
    (0, react_1.useEffect)(function () {
        setImages(imagesCtx.external.images[articleCtx.articleToEdit]);
    }, [articleCtx.articleToEdit, imagesCtx.external.images[articleCtx.articleToEdit]]);
    return (react_1.default.createElement("div", { className: 'w-8/12 overflow-y-auto h-[500px] pr-4 text-center' },
        react_1.default.createElement("div", { className: "grid grid-cols-5 gap-y-1 gap-x-1 mb-3" }, images && images.map(function (image) { return react_1.default.createElement(ExternalImageItem_1.default, { key: image.id, image: image, selectExternalImage: selectExternalImage.bind(null, image.url) }); })),
        react_1.default.createElement(react_2.Button, { className: 'bg-transparent border border-purple-500 text-purple-800 hover:text-white hover:bg-purple-400', onClick: imagesCtx.loadMore.bind(null, articleCtx.articleToEdit) }, "Load more")));
};
exports.default = ExternalImagesList;
//# sourceMappingURL=ExternalImagesList.js.map