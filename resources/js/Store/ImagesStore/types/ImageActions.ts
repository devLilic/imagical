import {
    SEARCH_RELEVANT_IMAGES, SET_LOCAL_QUERY,
    CROP_IMAGE,
    CROP_IMAGE_PENDING,
    CROP_IMAGE_PREPARE, INIT_IMAGES, LOAD_MORE_EXTERNAL_IMAGES,
    RESET_SEARCH, SEARCH_EXTERNAL_IMAGES, SEARCH_LOCAL_IMAGES,
    SELECT_EXTERNAL_IMAGE,
    SET_EXTERNAL_QUERY,
    SET_RELEVANT_QUERY
} from "@/Store/ImagesStore/images-actions";
import {IExternalImage, IImage, ILocalImage} from "@/Store/ImagesStore/types/Image";

export interface ISearchLocalImagesAction {
    type: typeof SET_LOCAL_QUERY,
    query: string
}

export interface ISearchRelevantImagesAction {
    type: typeof SET_RELEVANT_QUERY,
    query: string
}

export interface ISearchExternalImagesAction {
    type: typeof SET_EXTERNAL_QUERY
    query: string
}

export interface IResetImagesAction {
    type: typeof RESET_SEARCH
}

export interface ISelectExternalImageAction {
    type: typeof SELECT_EXTERNAL_IMAGE,
    url: string
}

export interface ISetCropSectionAction {
    type: typeof CROP_IMAGE_PREPARE
    section: {}
}

export interface ICropImageAction {
    type: typeof CROP_IMAGE_PENDING
}

export interface IRequestImagesAction {
    type: typeof INIT_IMAGES
    images: ILocalImage[]
}

export interface IRequestSearchLocalImagesAction {
    type: typeof SEARCH_LOCAL_IMAGES
    images: ILocalImage[]
}

export interface IRequestSearchExternalImagesAction {
    type: typeof SEARCH_EXTERNAL_IMAGES
    images: IExternalImage[]
    article_id: string
}

export interface IRequestRelevantImagesAction {
    type: typeof SEARCH_RELEVANT_IMAGES
    images: ILocalImage[]
}

export interface IRequestCropImageAction {
    type: typeof CROP_IMAGE
    image: IImage
}

export interface ILoadMoreAction {
    type: typeof LOAD_MORE_EXTERNAL_IMAGES
    images: IImage[],
    article_id: string
}

export type ImageActions =
    | ISearchLocalImagesAction
    | ISearchRelevantImagesAction
    | ISearchExternalImagesAction
    | IResetImagesAction
    | ISelectExternalImageAction
    | ISetCropSectionAction
    | ICropImageAction
    | IRequestImagesAction
    | IRequestSearchLocalImagesAction
    | IRequestSearchExternalImagesAction
    | IRequestRelevantImagesAction
    | IRequestCropImageAction
    | ILoadMoreAction
