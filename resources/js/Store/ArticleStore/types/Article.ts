import {ILocalImage} from "@/Store/ImagesStore/types/Image";

export interface IArticle {
    id: number
    title: string
    intro: string
    article_type: ArticleFieldType
    wallpaper: ILocalImage | null // image_id on the server
    slug: string, // tehno_title on server
    search_by: SearchByType
    isIntroDisplayed: boolean,
}

export interface IArticleApiResponse {
    id: number
    title: string
    intro: string
    article_type: ArticleFieldType
    wallpaper: ILocalImage | null // image_id on the server
    tehno_title: string
    slugs: string[]
}

export type SearchByType = "title" | "slug"
export type ArticleFieldType = "BETA" | "OFF"

export interface IDefaultArticlesState {
    articles: IArticle[]
    articleToEdit: IArticle
}

export interface IArticlesContext extends IDefaultArticlesState {
    showIntro: (article_id: number) => void
    setArticleToEdit: (article: IArticle) => void
    addWallpaper: (wallpaper: ILocalImage) => void
    removeWallpaper: (article_id: number) => void
    editSearch: (article_id: number, search_type: SearchByType) => void
    addNewArticle: (title: string, type: ArticleFieldType, previousID: number, after: boolean) => void
}
