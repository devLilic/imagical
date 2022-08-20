import React from "react";

const ImagesContext = React.createContext({
    images: [],
    search: '',
    loading: false,
    searchImages: search_value => {},
    uploadImage: () => {}
})

export default ImagesContext;
