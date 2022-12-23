"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var article_actions_1 = require("@/Store/ArticleStore/article-actions");
var article_reducer_1 = require("./article-reducer");
var articles_context_1 = require("@/Store/ArticleStore/articles-context");
var ArticlesProvider = function (_a) {
    var articles = _a.articles, children = _a.children;
    var _b = (0, react_1.useReducer)(article_reducer_1.articlesReducer, article_reducer_1.defaultArticlesState), articlesState = _b[0], dispatchArticlesAction = _b[1];
    (0, react_1.useEffect)(function () { return dispatchArticlesAction({
        type: article_actions_1.INIT_ARTICLES,
        articles: articles
    }); }, []);
    var showIntro = function (article_id) { return dispatchArticlesAction({
        type: article_actions_1.SHOW_INTRO,
        article_id: article_id
    }); };
    var editSearch = function (id, search_by) { return dispatchArticlesAction({
        type: article_actions_1.EDIT_SEARCH,
        article: { id: id, search_by: search_by }
    }); };
    var addWallpaper = function (wallpaper) { return dispatchArticlesAction({
        type: article_actions_1.ADD_WALLPAPER,
        wallpaper: wallpaper
    }); };
    var removeWallpaper = function (article_id) { return dispatchArticlesAction({
        type: article_actions_1.REMOVE_WALLPAPER,
        article_id: article_id
    }); };
    var setArticleToEdit = function (article) { return dispatchArticlesAction({
        type: article_actions_1.MARK_ARTICLE_FOR_EDIT,
        article: article
    }); };
    var addNewArticle = function (title, type, prevID, after) {
        if (after === void 0) { after = true; }
        return dispatchArticlesAction({
            type: article_actions_1.ADD_NEW_ARTICLE,
            article: { title: title, type: type },
            prevID: prevID,
            after: after
        });
    };
    var articlesContext = {
        articles: articlesState.articles,
        articleToEdit: articlesState.articleToEdit,
        showIntro: showIntro,
        setArticleToEdit: setArticleToEdit,
        addWallpaper: addWallpaper,
        removeWallpaper: removeWallpaper,
        editSearch: editSearch,
        addNewArticle: addNewArticle
    };
    // @ts-ignore
    return (React.createElement(articles_context_1.default.Provider, { value: articlesContext }, children));
};
exports.default = ArticlesProvider;
//# sourceMappingURL=ArticlesProvider.js.map