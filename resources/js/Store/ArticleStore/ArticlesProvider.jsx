import ArticlesContext from "@/Store/ArticleStore/articles-context";
import {useEffect, useReducer} from "react";
import {v4 as uuidv4} from 'uuid';
import {
    MARK_ARTICLE_FOR_EDIT,
    EDIT_SEARCH,
    INIT_ARTICLES,
    SHOW_INTRO,
    ADD_WALLPAPER, REMOVE_WALLPAPER, ADD_CUSTOM_TITLE, ADD_NEW_ARTICLE
} from "@/Store/ArticleStore/article-actions";

const article = {
    id: null, //uuid()
    title: '',
    slug: '',
    custom: '',
    content: '',
    type: '', // BETA, OFF
    search_by: 'slug',
    showIntro: false,
    images: {
        wallpaper: 'https://706172616e74657a65.ultracdn.net/storage/gaze-naturale-900x505_1-1000.png',
    }
};

const defaultArticlesState = ({
    articles: [],
    articleToEdit: null
})

class Artcle {
    constructor(title, type, slug, content) {
        this.id = uuidv4();
        this.title = title;
        this.slug = slug? slug : title;
        this.custom = '';
        this.content = content? content: 'Fără conținut';
        this.type = type;
        this.search_by = 'slug';
        this.isIntroDisplayed = false;
        this.images = {
            wallpaper: ''
        }
    }
}

const articlesReducer = (state, action) => {
    let articles = {};
    switch (action.type) {
        case INIT_ARTICLES:
            return {
                articleToEdit: null,
                articles: action.data.map(article => {
                    return new Artcle(article.title,  article.type, article.search_slug, article.content);
                })
            };
        case SHOW_INTRO:
            articles = state.articles.map(article => {
                article.isIntroDisplayed = (article.id === action.data) ? !article.isIntroDisplayed : false;
                return article;
            });
            return {...state, articles}
        case EDIT_SEARCH:
            articles = state.articles.map(article => {
                if (article.id === action.data.id) {
                    article.search_by = action.data.search_by
                }
                return article;
            })
            return {...state, articles: articles};
        case MARK_ARTICLE_FOR_EDIT:
            return {...state, articleToEdit: action.data};
        case ADD_WALLPAPER:
            articles = state.articles.map(article => {
                if (state.articleToEdit && article.id === state.articleToEdit) {
                    article.images.wallpaper = action.data
                }
                return article;
            })
            return {...state, articles, articleToEdit: null}
        case REMOVE_WALLPAPER:
            articles = state.articles.map(article => {
                if (article.id === action.data) {
                    article.images.wallpaper = null;
                }
                return article
            })
            return {...state, articles: articles}
        case ADD_CUSTOM_TITLE:
            articles = state.articles.map(article => {
                if (article.id === action.data.id) {
                    article.search_by = action.data.custom_title !== '' ? 'custom' : 'slug';
                    article.custom = action.data.custom_title;
                }
                return article;
            });
            return {...state, articles: articles}
        case ADD_NEW_ARTICLE:
            let key;
            state.articles.map((article, k) => {
                if(article.id === action.prevID){
                    key = k;
                }
            })
            const article = new Artcle(action.article.title, action.article.type)
            articles = [...state.articles]
            articles.splice(key+1, 0, article)
            return {...state, articles};
        default:
            return defaultArticlesState;
    }
}

const ArticlesProvider = props => {
    const [articlesState, dispatchArticlesAction] = useReducer(articlesReducer, defaultArticlesState);

    useEffect(() => {
        dispatchArticlesAction({type: INIT_ARTICLES, data: props.articles})
    }, []);

    const setShowIntro = id => {
        dispatchArticlesAction({type: SHOW_INTRO, data: id});
    }

    const editSearch = (id, search_by) => {
        dispatchArticlesAction({type: EDIT_SEARCH, data: {id: id, search_by: search_by}})
    }

    const addWallpaper = (image_url) => {
        dispatchArticlesAction({type: ADD_WALLPAPER, data: image_url})
    }

    const removeWallpaper = article_id => {
        dispatchArticlesAction({type: REMOVE_WALLPAPER, data: article_id});
    }

    const setArticleToEdit = (article_id) => {
        dispatchArticlesAction({type: MARK_ARTICLE_FOR_EDIT, data: article_id})
    }

    const addCustomTitle = (article_id, custom_title) => {
        dispatchArticlesAction({type: ADD_CUSTOM_TITLE, data: {id: article_id, custom_title: custom_title}})
    }

    const addNewArticle = (title, type, prevID) => {
        dispatchArticlesAction({type: ADD_NEW_ARTICLE, article: {title, type}, prevID})
    }

    const articlesContext = {
        articles: articlesState.articles,
        articleToEdit: articlesState.articleToEdit,
        showIntro: setShowIntro,
        setArticleToEdit: setArticleToEdit,
        addWallpaper: addWallpaper,
        removeWallpaper: removeWallpaper,
        editSearch: editSearch,
        addCustomTitle: addCustomTitle,
        addNewArticle,
    }

    return (
        <ArticlesContext.Provider value={articlesContext}>
            {props.children}
        </ArticlesContext.Provider>
    )
}

export default ArticlesProvider;
