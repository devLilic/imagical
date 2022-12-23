import {ImageActions} from "@/Store/ImagesStore/types/ImageActions";
import {
    CROP_IMAGE,
    CROP_IMAGE_PENDING,
    CROP_IMAGE_PREPARE,
    INIT_IMAGES,
    LOAD_MORE_EXTERNAL_IMAGES, RESET_SEARCH, SEARCH_EXTERNAL_IMAGES, SEARCH_LOCAL_IMAGES, SEARCH_RELEVANT_IMAGES,
    SELECT_EXTERNAL_IMAGE,
    SET_EXTERNAL_QUERY, SET_LOCAL_QUERY, SET_RELEVANT_QUERY
} from "./images-actions";
import {IDefaultImagesState} from "@/Store/ImagesStore/types/Image";


export const defaultLocalImagesState: IDefaultImagesState = {
    relevant: {
        loading: false,
        images: [],
        query: '',
    },
    local: {
        loading: false,
        images: [],
        query: '',
    },
    external: {
        loading: false,
        images: [],
        query: '',
        error: '',
        selected: {
            loading: false,
            url: '',
            readyToCrop: false,
            cropSection: {},
            croppedUrl: null
        }
    },
}

export const imagesReducer = (state: IDefaultImagesState, action: ImageActions): IDefaultImagesState => {
    switch (action.type) {
        case INIT_IMAGES:
        case SEARCH_LOCAL_IMAGES:
            return {
                ...state,
                local: {
                    ...state.local,
                    images: action.images,
                    loading: false
                }
            }
        case SET_LOCAL_QUERY:
            return (action.query === '') ? state : {
                ...state,
                local: {
                    ...state.local,
                    query: action.query,
                    loading: true
                }
            }
        case SET_RELEVANT_QUERY:
            return {
                ...state,
                relevant: {
                    ...state.relevant,
                    query: action.query,
                    loading: true
                }
            }
        case SEARCH_RELEVANT_IMAGES:
            return {
                ...state,
                relevant: {
                    ...state.relevant,
                    images: action.images,
                    loading: false
                }
            }
        case RESET_SEARCH:
            return {
                ...state,
                external: {...state.external, loading: false},
                local: {...state.local, query: '', loading: false},
                relevant: {...state.relevant, query: '', loading: false},
            }
        case SET_EXTERNAL_QUERY:
            return {
                ...state,
                external: {
                    ...state.external,
                    query: action.query,
                    error: '',
                    loading: true
                }
            }
        case SEARCH_EXTERNAL_IMAGES:
            let external_images = state.external.images;
            if (action.article_id in external_images) {
                external_images[action.article_id] = [...external_images[action.article_id], ...action.images];
            } else {
                external_images[action.article_id] = action.images
            }
            return {
                ...state,
                external: {
                    ...state.external,
                    images: external_images,
                    loading: false
                }
            };
        case LOAD_MORE_EXTERNAL_IMAGES:
            let images = {...state.external.images};
            images[action.article_id] = [...images[action.article_id], ...action.images];
            return {
                ...state,
                external: {
                    ...state.external,
                    images,
                    loading: false
                }
            };
        case SELECT_EXTERNAL_IMAGE:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {
                        ...state.external.selected,
                        url: action.url,
                        readyToCrop: false,
                        cropSection: {},
                        croppedUrl: null
                    }
                }
            }
        case CROP_IMAGE_PREPARE:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {
                        ...state.external.selected,
                        cropSection: action.section
                    }
                }
            }
        case CROP_IMAGE_PENDING:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {
                        ...state.external.selected,
                        readyToCrop: true,
                        loading: true
                    }
                }
            }
        case CROP_IMAGE:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {
                        ...state.external.selected,
                        croppedUrl: action.image,
                        readyToCrop: false,
                        loading: false
                    }
                }
            }
        default:
            return defaultLocalImagesState;
    }
}
