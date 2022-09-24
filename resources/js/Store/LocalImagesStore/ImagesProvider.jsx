import ImagesContext from "@/Store/LocalImagesStore/images-context";
import {useContext, useEffect, useReducer} from "react";
import {
    INIT_IMAGES,
    RESET_SEARCH,
    SEARCH_EXTERNAL_IMAGES,
    SEARCH_LOCAL_IMAGES,
    SEARCH_RELEVANT_IMAGES,
    SELECT_EXTERNAL_IMAGE,
    SET_EXTERNAL_QUERY,
    SET_LOCAL_QUERY,
    SET_RELEVANT_QUERY,
    CROP_IMAGE_PREPARE,
    CROP_IMAGE,
    CROP_IMAGE_PENDING,
    LOAD_MORE_EXTERNAL_IMAGES,
    LOADING_EXTERNAL_IMAGES, SET_EXTERNAL_ERROR,
} from "@/Store/LocalImagesStore/images-actions";
import apiRequest from "@/Helpers/Api";
import {v4 as uuidv4} from 'uuid';
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ExternalImage from "@/Helpers/ExternalImage";
import images from "@/Shared/Images";

const defaultLocalImagesState = {
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
        images: {},
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

const imagesReducer = (state, action) => {
    switch (action.type) {
        case INIT_IMAGES:
        case SEARCH_LOCAL_IMAGES:
            return {...state, local: {...state.local, images: action.images, loading: false}}
        case SET_LOCAL_QUERY:
            return (action.query === '') ? state : {
                ...state,
                local: {...state.local, query: action.query, loading: true}
            }
        case SET_RELEVANT_QUERY:
            return {...state, relevant: {...state.relevant, query: action.query, loading: true}}
        case SEARCH_RELEVANT_IMAGES:
            return {...state, relevant: {...state.relevant, images: action.images, loading: false}}
        case RESET_SEARCH:
            return {
                ...state,
                external: {...state.external, loading: false},
                local: {...state.local, query: '', loading: false},
                relevant: {...state.relevant, query: '', loading: false},
            }
        case SET_EXTERNAL_QUERY:
            return {...state, external: {...state.external, query: action.query, error: '', loading: true}}
        case SEARCH_EXTERNAL_IMAGES:
            let external_images = state.external.images;
            if (action.article_id in external_images) {
                external_images[action.article_id] = [...external_images[action.article_id], ...action.images];
            } else {
                external_images[action.article_id] = action.images
            }
            return {...state, external: {...state.external, images: external_images, loading: false}};
        case LOAD_MORE_EXTERNAL_IMAGES:
            let images = {...state.external.images};
            images[action.article_id] = [...images[action.article_id], ...action.images];
            return {...state, external: {...state.external, images, loading: false}};
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
                    selected: {...state.external.selected, cropSection: action.section}
                }
            }
        case CROP_IMAGE_PENDING:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {...state.external.selected, readyToCrop: true, loading: true}
                }
            }
        case CROP_IMAGE:
            return {
                ...state,
                external: {
                    ...state.external,
                    selected: {...state.external.selected, croppedUrl: action.image, readyToCrop: false, loading: false}
                }
            }
        case SET_EXTERNAL_ERROR:
            return {...state, external: {...state.external, error: action.error}}
        default:
            return defaultLocalImagesState;
    }
}

const ImagesProvider = props => {
    const articlesCtx = useContext(ArticlesContext)

    const [imagesState, dispatchImagesAction] = useReducer(imagesReducer, defaultLocalImagesState);

    useEffect(() => {
        apiRequest('/api/images').then(data => {
            dispatchImagesAction({type: INIT_IMAGES, images: data.data})
        });
    }, []);

    useEffect(() => {
        if (imagesState.relevant.query !== '') {
            let options = {
                params: {search: imagesState.relevant.query}
            }
            apiRequest('/api/relevant', options).then(data => {
                dispatchImagesAction({type: SEARCH_RELEVANT_IMAGES, images: data.data})
            });
        }
    }, [imagesState.relevant.query]);

    useEffect(() => {
        if (imagesState.local.query !== '') {
            let options = {
                params: {search: imagesState.local.query}
            }
            apiRequest('/api/search-images', options)
                .then(data => {
                    dispatchImagesAction({type: SEARCH_LOCAL_IMAGES, images: data.data})
                });
        }else{
            apiRequest('/api/images').then(data => {
                dispatchImagesAction({type: INIT_IMAGES, images: data.data})
            });
        }
    }, [imagesState.local.query])

    useEffect(() => {
        if (imagesState.external.query !== '' && !(articlesCtx.articleToEdit in imagesState.external.images)) {
            let options = {
                params: {search: imagesState.external.query}
            }
            apiRequest('/api/resources', options)
                .then(data => {
                    if (data.data.images === undefined) {
                        dispatchImagesAction({type: SET_EXTERNAL_ERROR, error: data.data.error})
                        throw data.data.error
                    }
                    const images = data.data.images.map(image => {
                        return new ExternalImage(image.link, image.image.contextLink, image.displayLink, image.image.width, image.image.height);
                    })
                    dispatchImagesAction({type: SEARCH_EXTERNAL_IMAGES, images, article_id: articlesCtx.articleToEdit})
                }).catch(error => {
                console.log(error)
            });
        }
    }, [imagesState.external.query])

    useEffect(() => {
        if (imagesState.external.selected.readyToCrop) {
            let options = {
                params: {url: imagesState.external.selected.url, section: imagesState.external.selected.cropSection}
            }

            apiRequest('/api/crop', options)
                .then(data => {
                    let image = data.data.image
                    articlesCtx.addWallpaper(image.url)
                    dispatchImagesAction({type: CROP_IMAGE, image})
                });
        }

    }, [imagesState.external.selected.readyToCrop]);

    const searchLocalImages = query => {
        dispatchImagesAction({type: SET_LOCAL_QUERY, query})
    }

    const searchRelevantImages = query => {
        dispatchImagesAction({type: SET_RELEVANT_QUERY, query})
    }

    const searchExternalImages = query => {
        dispatchImagesAction({type: SET_EXTERNAL_QUERY, query})
    }

    const resetImages = () => {
        dispatchImagesAction({type: RESET_SEARCH})
    }

    // select external image. after this, that image can be edited, cropped or tagged and saved
    const selectExternalImage = url => {
        dispatchImagesAction({type: SELECT_EXTERNAL_IMAGE, url})
    }

    const setCropSection = cropSection => {
        dispatchImagesAction({type: CROP_IMAGE_PREPARE, section: cropSection})
    }

    const cropImage = () => {
        dispatchImagesAction({type: CROP_IMAGE_PENDING})
    }

    const loadMore = () => {

        let options = {
            params: {
                search: imagesState.external.query,
                startIndex: imagesState.external.images[articlesCtx.articleToEdit]?.length + 1
            }
        }
        apiRequest('/api/resources', options)
            .then(data => {
                if (data.data.images === undefined) {
                    dispatchImagesAction({type: SET_EXTERNAL_ERROR, error: data.data.error})
                    throw data.data.error
                }
                const images = data.data.images.map(image => {
                    return new ExternalImage(image.link, image.image.contextLink, image.displayLink, image.image.width, image.image.height);
                })
                dispatchImagesAction({type: LOAD_MORE_EXTERNAL_IMAGES, images, article_id: articlesCtx.articleToEdit})
            }).catch(error => {
            console.log(error)
        });
    }

    const imagesContext = {
        relevant: {
            query: imagesState.relevant.query,
            images: imagesState.relevant.images,
            loading: imagesState.relevant.loading
        },
        local: {
            query: imagesState.local.query,
            images: imagesState.local.images,
            loading: imagesState.local.loading
        },
        external: {
            query: imagesState.external.query,
            images: imagesState.external.images,
            loading: imagesState.external.loading,
            error: imagesState.external.error,
            selected: {
                loading: imagesState.external.selected.loading,
                url: imagesState.external.selected.url,
                readyToCrop: imagesState.external.selected.readyToCrop,
                cropSection: imagesState.external.selected.cropSection,
                croppedUrl: imagesState.external.selected.croppedUrl
            }
        },
        resetImages,
        searchLocalImages,
        searchRelevantImages,
        searchExternalImages,
        selectExternalImage,
        setCropSection,
        cropImage,
        loadMore,
    }

    return (
        <ImagesContext.Provider value={imagesContext}>
            {props.children}
        </ImagesContext.Provider>
    )
}

export default ImagesProvider;
