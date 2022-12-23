import {ActionType} from "@/Store/ArticleStore/types/ArticleAction";
import {IArticle, IArticleApiResponse, IDefaultArticlesState} from "./types/Article";
import {
    ADD_CUSTOM_TITLE,
    ADD_NEW_ARTICLE, ADD_WALLPAPER, EDIT_SEARCH, MARK_ARTICLE_FOR_EDIT, INIT_ARTICLES, REMOVE_WALLPAPER, SHOW_INTRO
} from "./article-actions";

export const defaultArticlesState: IDefaultArticlesState = ({
    articles: [],
    articleToEdit: null
})

export const articlesReducer = (state: IDefaultArticlesState, action: ActionType): IDefaultArticlesState => {
    let articles: IArticle[] = [];
    switch (action.type) {
        case INIT_ARTICLES:
            articles = action.articles.map(article => ({
                id: article.id,
                title: article.title,
                slug: article.tehno_title,
                article_type: article.article_type,
                intro: article.intro,
                wallpaper: article.wallpaper,
                search_by: 'slug',
                isIntroDisplayed: false,
            }));
            return {
                articleToEdit: null,
                articles
            };
        case SHOW_INTRO:
            articles = state.articles.map(article => ({
                ...article,
                isIntroDisplayed: (article.id === action.article_id) ? !article.isIntroDisplayed : false
            }));
            return {...state, articles}
        case EDIT_SEARCH:
            articles = state.articles.map(article => ({
                ...article,
                search_by: (article.id === action.article.id) ? action.article.search_by : article.search_by
            }))
            return {...state, articles};
        case MARK_ARTICLE_FOR_EDIT:
            return {
                ...state,
                articleToEdit: action.article
            };
        case ADD_WALLPAPER:
            articles = state.articles.map(article => ({
                ...article,
                wallpaper: (state.articleToEdit && article.id === state.articleToEdit.id) ? action.wallpaper : article.wallpaper
            }))
            return {...state, articles, articleToEdit: null}
        case REMOVE_WALLPAPER:
            articles = state.articles.map(article => {
                if (article.id === action.article_id) {
                    article.wallpaper = null;
                }
                return article
            })
            return {...state, articles}
        case ADD_NEW_ARTICLE:
            let key;
            state.articles.map((article, k) => {
                if (article.id === action.prevID) {
                    key = k;
                }
            })
            const article: IArticle = {
                id: 0, intro: "", isIntroDisplayed: false, search_by: undefined, slug: "", wallpaper: undefined,
                title: action.article.title,
                article_type: action.article.type
            }
            articles = [...state.articles]
            articles.splice(key + 1, 0, article)
            return {...state, articles};
        default:
            return defaultArticlesState;
    }
}
