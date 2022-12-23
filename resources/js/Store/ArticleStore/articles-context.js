"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ArticlesContext = react_1.default.createContext({
    articles: [],
    articleToEdit: null,
    showIntro: function (article_id) { },
    setArticleToEdit: function (article_id) { },
    addWallpaper: function (image_url) { },
    removeWallpaper: function (articleID) { },
    editSearch: function (article_id, search_type) { },
    addCustomTitle: function (article_id, custom_title) { },
    addNewArticle: function (title, type, prevID) { }
});
exports.default = ArticlesContext;
//# sourceMappingURL=articles-context.js.map