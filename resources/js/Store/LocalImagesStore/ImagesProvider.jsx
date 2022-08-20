import ImagesContext from "@/Store/LocalImagesStore/images-context";
import {useEffect, useReducer} from "react";
import axios from "axios";
import {INIT_IMAGES, SEARCH_IMAGES_SUCCESS, SEARCH_IMAGES_PENDING} from "@/Store/LocalImagesStore/images-actions";

const defaultLocalImagesState = {
    images: [],
    search: '',
    loading: false,
}

const imagesReducer = (state, action) => {
    switch (action.type) {
        case INIT_IMAGES:
        case SEARCH_IMAGES_SUCCESS:
            return {...state, images: action.data, loading: false}
        case SEARCH_IMAGES_PENDING:
            if (action.data === '') {
                return state;
            }
            return {...state, search: action.data, loading: true}
        default:
            return defaultLocalImagesState;
    }
}

const loadImages = async (url, search = null, action = INIT_IMAGES) => {
    const axios_params = {
        method: 'get',
        url: url,
        responseType: 'json',
    }
    if (search) {
        axios_params.search = search;
    }
    return axios(axios_params);
}

const ImagesProvider = props => {
    const [imagesState, dispatchImagesAction] = useReducer(imagesReducer, defaultLocalImagesState);

    useEffect(() => {
        loadImages('/api/images').then(data => {
            dispatchImagesAction({type: INIT_IMAGES, data: data.data})
        });
    }, []);

    useEffect(()=> {
        loadImages('/api/images', imagesState.search).then(data => {
            dispatchImagesAction({type: SEARCH_IMAGES_SUCCESS, data: data.data})
        });
    }, [imagesState.search])

    const searchImages = search_value => {
        dispatchImagesAction({type: SEARCH_IMAGES_PENDING, data: search_value})
    }

    const imagesContext = {
        images: imagesState.images,
        search: imagesState.search,
        loading: imagesState.loading,
        searchImages: searchImages,
    }

    return (
        <ImagesContext.Provider value={imagesContext}>
            {props.children}
        </ImagesContext.Provider>
    )
}

export default ImagesProvider;
