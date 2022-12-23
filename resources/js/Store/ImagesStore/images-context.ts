import React from "react";
import {IImagesContext} from "@/Store/ImagesStore/types/Image";

const ImagesContext = React.createContext<IImagesContext>({
    relevant: {
        loading: false,
        images: [],
        query: ''
    },
    local: {
        loading: false,
        images: [],
        query: ''
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
            croppedUrl: null,
        }
    },
    searchLocalImages: (query) => {},
    searchRelevantImages: (query) => {},
    searchExternalImages: (query) => {},
    resetImages: () => {},
    selectExternalImage: (url) => {},
    setCropSection: () => {}, // TODO correct typescript
    cropImage: () => {},
    loadMore: async (article_id) => {},
    requestImages: async () => {},
    requestSearchExternalImages: async (query, start_index, article_id) => {},
    requestCropImage: async (url, section) => {},
    requestRelevantImages: async (query) => {},
    requestSearchLocalImages: async (query) => {}
})

export default ImagesContext;
