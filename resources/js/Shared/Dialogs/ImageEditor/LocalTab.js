"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var images_context_1 = require("@/Store/ImagesStore/images-context");
var react_2 = require("@material-tailwind/react");
var LocalImages_1 = require("@/Components/LocalImages/LocalImages");
var LocalTab = function (_a) {
    var onSelectImage = _a.onSelectImage;
    var imagesCtx = (0, react_1.useContext)(images_context_1.default);
    var _b = (0, react_1.useState)(''), searchTag = _b[0], setSearchTag = _b[1];
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            if (searchTag !== '') {
                imagesCtx.searchLocalImages(searchTag);
            }
            else {
                imagesCtx.resetImages();
            }
        }, 1000);
        return function () {
            clearTimeout(timer);
        };
    }, [searchTag]);
    var handleSearchTag = function (event) {
        setSearchTag(event.target.value);
    };
    var localImagesTitle = ((imagesCtx.local.images.length > 0) ?
        (searchTag ? "Rezultate pentru \"".concat(searchTag, "\"") : "Toate imaginile") :
        "Nu am găsit nimic");
    return (react_1.default.createElement(react_2.TabPanel, { key: 'local', value: 'local', className: 'w-full' },
        react_1.default.createElement("div", { className: "my-2 w-3/12 mx-auto" },
            react_1.default.createElement(react_2.Input, { label: 'Caut\u0103 imagini dup\u0103 tag', className: "text-center", value: searchTag, onChange: handleSearchTag })),
        react_1.default.createElement("div", { className: 'flex' },
            react_1.default.createElement("div", { className: imagesCtx.relevant.images.length ? 'w-2/12' : '' },
                react_1.default.createElement(LocalImages_1.default, { title: 'Relevante', images: imagesCtx.relevant.images, onSelectImage: onSelectImage, loading: imagesCtx.relevant.loading, className: 'grid-cols-1 h-96' })),
            react_1.default.createElement("div", { className: imagesCtx.relevant.images.length ? 'w-10/12' : 'w-full' },
                react_1.default.createElement(LocalImages_1.default, { title: localImagesTitle, images: imagesCtx.local.images, onSelectImage: onSelectImage, loading: imagesCtx.local.loading, className: 'grid-cols-8 h-96' })))));
};
exports.default = LocalTab;
//# sourceMappingURL=LocalTab.js.map