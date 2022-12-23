import {ITag} from "@/types/Tag";

export interface IImage {
    id: number
    url: string
}

export interface ILocalImage extends IImage {
    isNew: boolean
    tags: ITag[]
}

export interface IExternalImage extends IImage {
    article_url: string;
    site: string;
    width: number;
    height: number;
}

// types for ImagesContext
export interface ImagesType<T> {
    loading: boolean,
    images: T[],
    query: string
}


export interface ISelection {
    loading: boolean
    url: string
    readyToCrop: boolean,
    cropSection: {},
    croppedUrl: IImage | null,
}

export type RelevantImagesType = ImagesType<IImage>
export type LocalImagesType = ImagesType<IImage>
export type ExternalImagesType = ImagesType<[]> & {
    error: string,
    selected: ISelection
}

// default images state
export interface IDefaultImagesState {
    relevant: RelevantImagesType,
    local: LocalImagesType,
    external: ExternalImagesType
}

// images context
export interface IImagesContext extends IDefaultImagesState{
    searchLocalImages: (query: string) => void
    searchRelevantImages: (query: string) => void
    searchExternalImages: (query: string) => void
    resetImages: () => void
    selectExternalImage: (url: string) => void
    setCropSection: (cropSection: []) => void
    cropImage: () => void
    loadMore: (article_id: string) => void
    requestImages: () => void
    requestSearchExternalImages: (query: string, start_index: number | null, article_id: string) => void
    requestRelevantImages: (query: string) => void
    requestCropImage: (url: string, section: {}) => void
    requestSearchLocalImages: (query: string) => void
}
