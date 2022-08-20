import ArticlesContext from "@/Store/ArticleStore/articles-context";
import {useEffect, useReducer} from "react";
import {v4 as uuidv4} from 'uuid';
import {
    MARK_ARTICLE_FOR_EDIT,
    EDIT_SEARCH,
    INIT_ARTICLES,
    SHOW_INTRO,
    ADD_WALLPAPER, REMOVE_WALLPAPER
} from "@/Store/ArticleStore/article-actions";

const article = {
    id: null, //uuid()
    title: '',
    content: '',
    type: '', // BETA, OFF
    search: {
        field: '', // SLUG, TITLE, CUSTOM
        value: '',
    },
    showIntro: false,
    images: {
        wallpaper: 'https://706172616e74657a65.ultracdn.net/storage/gaze-naturale-900x505_1-1000.png',
    }
};

const defaultArticlesState = ({
    articles: [],
    articleToEdit: null
})

const articlesReducer = (state, action) => {
    let articles = {};
    switch (action.type) {
        case INIT_ARTICLES:
            return {
                articleToEdit: null,
                articles: action.data.map(article => {
                    return {
                        id: uuidv4(),
                        title: article.title,
                        content: article.content,
                        type: article.type,
                        search: {
                            field: 'slug',
                            value: article.search_slug,
                        },
                        isIntroDisplayed: false,
                        images: {
                            wallpaper: '',
                            // wallpaper: 'https://706172616e74657a65.ultracdn.net/storage/gaze-naturale-900x505_1-1000.png',
                        }
                    }
                })
            };
        case SHOW_INTRO:
            articles = state.articles.map(article => {
                if (article.id === action.data) {
                    article.isIntroDisplayed = !article.isIntroDisplayed;
                } else {
                    article.isIntroDisplayed = false;
                }
                return article;
            });
            return {...state, articles: articles}

        case EDIT_SEARCH:
            articles = state.articles.map(article => {
                if (article.id === action.data.id) {

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
            let articleToEdit = null;
            return {...state, articles: articles, articleToEdit: articleToEdit}
        case REMOVE_WALLPAPER:
            articles = state.articles.map(article => {
                if(article.id === action.data){
                    article.images.wallpaper = null;
                }
                return article
            })
            return {...state, articles: articles}
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

    const editSearch = (id, search_field, search_value) => {
        console.log(id, search_field, search_value);
        // dispatchArticlesAction({
        //     type: EDIT_SEARCH, data: {
        //         id: id,
        //         search: {
        //             field: search_field,
        //             value: search_value
        //         }
        //     }
        // })
    }

    const addWallpaper = (image_url) => {
        dispatchArticlesAction({type: ADD_WALLPAPER, data: image_url})
    }

    const removeWallpaper = article_id => {
        dispatchArticlesAction({ type: REMOVE_WALLPAPER, data: article_id});
    }

    const setArticleToEdit = (article_id) => {
        dispatchArticlesAction({type: MARK_ARTICLE_FOR_EDIT, data: article_id})
    }

    const articlesContext = {
        articles: articlesState.articles,
        articleToEdit: articlesState.articleToEdit,
        showIntro: setShowIntro,
        setArticleToEdit: setArticleToEdit,
        addWallpaper: addWallpaper,
        removeWallpaper: removeWallpaper,
        editSearch: editSearch,
        removeArticle: (id) => {
        }
    }

    return (
        <ArticlesContext.Provider value={articlesContext}>
            {props.children}
        </ArticlesContext.Provider>
    )
}

export default ArticlesProvider;
