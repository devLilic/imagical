import React from "react";

const FilesContext = React.createContext({
    filesToUpload: [],
    files: [],
    loading: false,
    uploadImages: () => {},
    deleteImage: image_id => {},
    addTags: image_id => {},
    saveTags: () => {}
})

export default FilesContext;
