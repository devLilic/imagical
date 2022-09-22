import FilesContext from "@/Store/UploadFiles/files-context";
import {useEffect, useReducer} from "react";
import {
    ADD_FILES_TO_UPLOAD, ADD_TAGS,
    DELETE_IMAGE, SAVE_TAGS,
    SET_FILES_LIMIT_EXCEED,
    VIEW_UPLOADED_FILES
} from "@/Store/UploadFiles/files-actions";
import apiRequest from "@/Helpers/Api";

const defaultFilesState = ({
    filesToUpload: [],
    files: [],
    loading: false
});

const filesReducer = (state, action) => {
    let files;
    switch (action.type) {
        case ADD_FILES_TO_UPLOAD:
            return {...state, filesToUpload: action.files, loading: true}
        case VIEW_UPLOADED_FILES:
            return {...state, filesToUpload: [], files: [...state.files, ...action.files], loading: false}
        case DELETE_IMAGE:
            files = state.files.filter(image => image.id !== action.image_id);
            return {...state, files}
        case ADD_TAGS:
            files = state.files.map(image => {
                if (image.id === action.image_id) {
                    image.tags = action.tags
                }
                return image;
            })
            return {...state, files}
        case SAVE_TAGS:
            const imagesToUpdate = [];
            const imagesWithoutTags = [];
            state.files.map(image => {
                (image.tags !== '') ? imagesToUpdate.push(image) : imagesWithoutTags.push(image)
            })
            if (imagesToUpdate.length > 0) {
                apiRequest('/api/addTags',
                    {data: {images: JSON.stringify(imagesToUpdate)}},
                    'post')
            }
            return {...state, files: imagesWithoutTags}
        default:
            return defaultFilesState;
    }
}

const FilesProvider = props => {
    const MAX_UPLOADS = 10;
    const [filesState, dispatchFilesAction] = useReducer(filesReducer, defaultFilesState);

    useEffect(() => {
        if (filesState.filesToUpload.length) {
            let formData = new FormData();
            filesState.filesToUpload.map(file => {
                formData.append('files[]', file)
            })
            const options = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData
            }
            apiRequest('/api/upload', options, 'post')
                .then(result => {
                    const files = result.data.map(file => {
                        return {
                            id: file.id,
                            url: file.url,
                            tags: ''
                        }
                    });
                    dispatchFilesAction({type: VIEW_UPLOADED_FILES, files})
                }).catch(error => {
                console.log('error', error)
            })
        }
    }, [filesState.filesToUpload.length]);

    const uploadImages = files => {
        const selectedFiles = Array.prototype.slice.call(files.target.files);

        if (selectedFiles.length > MAX_UPLOADS) {
            alert(`Nu poti incarca mai mult de ${MAX_UPLOADS} imagini odata`);
        } else {
            dispatchFilesAction({type: ADD_FILES_TO_UPLOAD, files: selectedFiles})
        }
    }

    const deleteImage = image_id => {
        apiRequest('/api/images', {data: {image_id}}, 'delete')
            .then(response => {
                dispatchFilesAction({type: DELETE_IMAGE, image_id})
            })
    }

    const addTags = image_id => {
        dispatchFilesAction({type: ADD_TAGS, image_id, tags: event.target.value,})
    }

    const saveTags = () => {
        dispatchFilesAction({type: SAVE_TAGS});
    }

    const filesContext = {
        filesToUpload: filesState.filesToUpload,
        files: filesState.files,
        loading: filesState.loading,
        uploadImages,
        deleteImage,
        addTags,
        saveTags
    };

    return <FilesContext.Provider value={filesContext}>
        {props.children}
    </FilesContext.Provider>
}

export default FilesProvider;
