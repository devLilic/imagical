import {useEffect, useReducer} from "react";
import {
    MARK_ARTICLE_FOR_EDIT,
    EDIT_SEARCH,
    INIT_ARTICLES,
    SHOW_INTRO,
    ADD_WALLPAPER, REMOVE_WALLPAPER, ADD_NEW_ARTICLE
} from "@/Store/ArticleStore/article-actions";
import {IArticle, IArticleApiResponse, IArticlesContext, SearchByType} from "@/Store/ArticleStore/types/Article";
import {articlesReducer, defaultArticlesState} from "./article-reducer";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import {IImage, ILocalImage} from "@/Store/ImagesStore/types/Image";

interface IArticleProviderProps {
    articles: IArticleApiResponse[],
    children
}

const ArticlesProvider = ({articles, children}: IArticleProviderProps) => {
    const [articlesState, dispatchArticlesAction] = useReducer(articlesReducer, defaultArticlesState);

    useEffect(() => dispatchArticlesAction({
        type: INIT_ARTICLES,
        articles: articles
    }), []);

    const showIntro = (article_id: number): void => dispatchArticlesAction({
        type: SHOW_INTRO,
        article_id
    })

    const editSearch = (id: number, search_by: SearchByType): void => dispatchArticlesAction({
        type: EDIT_SEARCH,
        article: {id, search_by}
    })

    const addWallpaper = (wallpaper: ILocalImage) => dispatchArticlesAction({
        type: ADD_WALLPAPER,
        wallpaper
    })

    const removeWallpaper = (article_id: number) => dispatchArticlesAction({
        type: REMOVE_WALLPAPER,
        article_id
    })

    const setArticleToEdit = (article: IArticle) => dispatchArticlesAction({
        type: MARK_ARTICLE_FOR_EDIT,
        article
    })

    const addNewArticle = (title, type, prevID, after=true) => dispatchArticlesAction({
        type: ADD_NEW_ARTICLE,
        article: {title, type},
        prevID,
        after
    })

    const articlesContext: IArticlesContext = {
        articles: articlesState.articles,
        articleToEdit: articlesState.articleToEdit,
        showIntro,
        setArticleToEdit,
        addWallpaper,
        removeWallpaper,
        editSearch,
        addNewArticle
    }

    // @ts-ignore
    return (<ArticlesContext.Provider value={articlesContext}>
        {children}
    </ArticlesContext.Provider>)
}

export default ArticlesProvider;
