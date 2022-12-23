"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Dialog_1 = require("@/Components/UI/Dialog");
var articles_context_1 = require("@/Store/ArticleStore/articles-context");
var images_context_1 = require("@/Store/ImagesStore/images-context");
var Tabs_1 = require("@/Shared/Dialogs/ImageEditor/Tabs");
var ImageEditorDialog = function (_a) {
    var dialogOpen = _a.dialogOpen, handleDialog = _a.handleDialog;
    var articlesCtx = (0, react_1.useContext)(articles_context_1.default);
    var imagesCtx = (0, react_1.useContext)(images_context_1.default);
    var currentArticle = articlesCtx.articleToEdit ? articlesCtx.articles.filter(function (article) { return article.id === articlesCtx.articleToEdit; }) :
        [{ slug: 'NO ARTILCE SELECTED', search_by: 'not' }];
    (0, react_1.useEffect)(function () {
        if (dialogOpen) {
            imagesCtx.searchRelevantImages(currentArticle[0].slug);
            var query = currentArticle[0][currentArticle[0].search_by];
            imagesCtx.searchExternalImages(query);
        }
    }, [dialogOpen]);
    var setSelectedImage = function (image_url) {
        articlesCtx.addWallpaper(image_url);
        handleDialog();
        imagesCtx.resetImages();
    };
    return (react_1.default.createElement(Dialog_1.default, { size: "xxl", open: dialogOpen, handleDialog: handleDialog, title: currentArticle[0].slug, closeBtn: true },
        react_1.default.createElement(Tabs_1.default, { selectImage: setSelectedImage, hideDialog: handleDialog })));
};
exports.default = ImageEditorDialog;
//# sourceMappingURL=ImageEditorDialog.js.map