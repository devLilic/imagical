import React from "react";

const ImagesContext = React.createContext({
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
        images: {},
        query: '',
        selected: {
            url: '',
            readyToCrop: false,
            cropSection: {},
            croppedUrl: null,
        }
    },
    searchLocalImages: query => {},
    searchRelevantImages: query => {},
    searchExternalImages: query => {},
    resetImages: () => {},
    selectExternalImage: url => {},
    setCropSection: cropSection => {},
    cropImage: () => {},
    loadMore: () => {}
})

export default ImagesContext;
