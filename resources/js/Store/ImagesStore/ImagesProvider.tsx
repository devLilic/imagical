import ImagesContext from "@/Store/ImagesStore/images-context";
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
} from "@/Store/ImagesStore/images-actions";
import ArticlesContext from '@/Store/ArticleStore/articles-context';
import {ImageAPI} from "@/api/image-api";
import {defaultLocalImagesState, imagesReducer} from "./images-reducer";
import {IArticlesContext} from "@/Store/ArticleStore/types/Article";
import {IImagesContext} from "@/Store/ImagesStore/types/Image";

const ImagesProvider = props => {
    const articlesCtx = useContext<IArticlesContext>(ArticlesContext)

    const [imagesState, dispatchImagesAction] = useReducer(imagesReducer, defaultLocalImagesState);

    useEffect(() => {
        requestImages()
    }, []);

    useEffect(() => {
        if (imagesState.relevant.query !== '') {
            requestRelevantImages(imagesState.relevant.query);
        }
    }, [imagesState.relevant.query]);

    useEffect(() => {
        if (imagesState.local.query !== '') {
            requestSearchLocalImages(imagesState.local.query)
        } else {
            requestImages()
        }
    }, [imagesState.local.query])


    useEffect(() => {
        if (imagesState.external.selected.readyToCrop) {
            requestCropImage(imagesState.external.selected.url, imagesState.external.selected.cropSection)
        }
    }, [imagesState.external.selected.readyToCrop]);


    useEffect(() => {
        if (imagesState.external.query !== '' && !(articlesCtx.articleToEdit in imagesState.external.images)) {
            requestSearchExternalImages(imagesState.external.query, null, articlesCtx.articleToEdit)
        }
    }, [imagesState.external.query])

    const searchLocalImages = (query) => dispatchImagesAction({
        type: SET_LOCAL_QUERY,
        query
    })

    const searchRelevantImages = (query) => dispatchImagesAction({
        type: SET_RELEVANT_QUERY,
        query
    })

    const searchExternalImages = (query) => dispatchImagesAction({
        type: SET_EXTERNAL_QUERY,
        query
    })

    const resetImages = () => dispatchImagesAction({type: RESET_SEARCH})

    const selectExternalImage = (url) => {
        return dispatchImagesAction({
            type: SELECT_EXTERNAL_IMAGE,
            url
        })
    }

    const setCropSection = (cropSection) => dispatchImagesAction({
        type: CROP_IMAGE_PREPARE,
        section: cropSection
    })

    const cropImage = () => dispatchImagesAction({type: CROP_IMAGE_PENDING})

    const requestImages = async () => {
        const imagesRequest = await ImageAPI.getImages()
        return dispatchImagesAction({type: INIT_IMAGES, images: imagesRequest.images})
    }

    const requestSearchLocalImages = async (query) => {
        const images = await ImageAPI.searchImages(query)
        return dispatchImagesAction({type: SEARCH_LOCAL_IMAGES, images})
    }

    const requestSearchExternalImages = async (query, start_index = null, article_id) => {
        const images = await ImageAPI.getExternal(query, start_index)
        return dispatchImagesAction({type: SEARCH_EXTERNAL_IMAGES, images, article_id})
    }

    const requestRelevantImages = async (query) => {
        const images = await ImageAPI.getRelevant(query);
        dispatchImagesAction({type: SEARCH_RELEVANT_IMAGES, images})
    }

    const requestCropImage = async (url, section) => {
        const image = await ImageAPI.cropImage(url, section)
        articlesCtx.addWallpaper(image.url)
        return dispatchImagesAction({type: CROP_IMAGE, image})
    }

    const loadMore = async (article_id) => {
        const images = await ImageAPI.getExternal(imagesState.external.query, imagesState.external.images[article_id]?.length + 1)
        return dispatchImagesAction({type: LOAD_MORE_EXTERNAL_IMAGES, images, article_id})
    }

    const imagesContext: IImagesContext = {
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
        requestSearchLocalImages,
        requestImages,
        requestSearchExternalImages,
        requestRelevantImages,
        requestCropImage
    }

    // @ts-ignore
    return (<ImagesContext.Provider value={imagesContext}>
        {props.children}
    </ImagesContext.Provider>)
}

export default ImagesProvider;
