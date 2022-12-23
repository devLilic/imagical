import {
    ADD_CUSTOM_TITLE,
    ADD_NEW_ARTICLE,
    ADD_WALLPAPER,
    EDIT_SEARCH,
    INIT_ARTICLES,
    MARK_ARTICLE_FOR_EDIT,
    REMOVE_WALLPAPER,
    SHOW_INTRO
} from "@/Store/ArticleStore/article-actions"
import {ArticleFieldType, IArticle, IArticleApiResponse, SearchByType} from "./Article";
import {IImage} from "@/Store/ImagesStore/types/Image";

export type ShowIntroActionType = {
    type: typeof SHOW_INTRO,
    article_id: number
}

export type EditSearchActionType = {
    type: typeof EDIT_SEARCH,
    article: {
        id: number,
        search_by: SearchByType
    }
}

export type AddWallpaperActionType = {
    type: typeof ADD_WALLPAPER
    wallpaper: IImage
}

export type RemoveWallpaperActionType = {
    type: typeof REMOVE_WALLPAPER
    article_id: number
}

export type InitArticlesActionType = {
    type: typeof INIT_ARTICLES
    articles: IArticleApiResponse[]
}

export type SetArticleToEditActionType = {
    type: typeof MARK_ARTICLE_FOR_EDIT
    article: IArticle
}

export type AddNewArticleActionType = {
    type: typeof ADD_NEW_ARTICLE,
    article: { title: string, type: ArticleFieldType },
    prevID: number,
    after: boolean
}


export type ActionType =
    | ShowIntroActionType
    | EditSearchActionType
    | AddWallpaperActionType
    | RemoveWallpaperActionType
    | InitArticlesActionType
    | SetArticleToEditActionType
    | AddNewArticleActionType
