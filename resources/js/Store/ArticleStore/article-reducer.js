"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesReducer = exports.defaultArticlesState = void 0;
var article_actions_1 = require("./article-actions");
exports.defaultArticlesState = ({
    articles: [],
    articleToEdit: null
});
var articlesReducer = function (state, action) {
    var articles = [];
    switch (action.type) {
        case article_actions_1.INIT_ARTICLES:
            articles = action.articles.map(function (article) { return ({
                id: article.id,
                title: article.title,
                slug: article.tehno_title,
                article_type: article.article_type,
                intro: article.intro,
                wallpaper: article.wallpaper,
                search_by: 'slug',
                isIntroDisplayed: false,
            }); });
            return {
                articleToEdit: null,
                articles: articles
            };
        case article_actions_1.SHOW_INTRO:
            articles = state.articles.map(function (article) { return (__assign(__assign({}, article), { isIntroDisplayed: (article.id === action.article_id) ? !article.isIntroDisplayed : false })); });
            return __assign(__assign({}, state), { articles: articles });
        case article_actions_1.EDIT_SEARCH:
            articles = state.articles.map(function (article) { return (__assign(__assign({}, article), { search_by: (article.id === action.article.id) ? action.article.search_by : article.search_by })); });
            return __assign(__assign({}, state), { articles: articles });
        case article_actions_1.MARK_ARTICLE_FOR_EDIT:
            return __assign(__assign({}, state), { articleToEdit: action.article });
        case article_actions_1.ADD_WALLPAPER:
            articles = state.articles.map(function (article) { return (__assign(__assign({}, article), { wallpaper: (state.articleToEdit && article.id === state.articleToEdit.id) ? action.wallpaper : article.wallpaper })); });
            return __assign(__assign({}, state), { articles: articles, articleToEdit: null });
        case article_actions_1.REMOVE_WALLPAPER:
            articles = state.articles.map(function (article) {
                if (article.id === action.article_id) {
                    article.wallpaper = null;
                }
                return article;
            });
            return __assign(__assign({}, state), { articles: articles });
        case article_actions_1.ADD_NEW_ARTICLE:
            var key_1;
            state.articles.map(function (article, k) {
                if (article.id === action.prevID) {
                    key_1 = k;
                }
            });
            var article = {
                id: 0, intro: "", isIntroDisplayed: false, search_by: undefined, slug: "", wallpaper: undefined,
                title: action.article.title,
                article_type: action.article.type
            };
            articles = __spreadArray([], state.articles, true);
            articles.splice(key_1 + 1, 0, article);
            return __assign(__assign({}, state), { articles: articles });
        default:
            return exports.defaultArticlesState;
    }
};
exports.articlesReducer = articlesReducer;
//# sourceMappingURL=article-reducer.js.map