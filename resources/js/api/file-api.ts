import {instance} from "./api"
import {ILocalImage} from "@/Store/ImagesStore/types/Image";

interface IFileApi {
    getFiles: () => Promise<ILocalImage[]>
    uploadImages: (data: any) => Promise<any>
    deleteImage: (image_id: string) => Promise<ILocalImage>
    addTags: (images: string) => Promise<any>
}

export const FileApi: IFileApi = {
    getFiles: () => {
        return instance.get('images')
            .then(response => response.data)
    },
    uploadImages: (data) => {
        return instance.post(
            'upload',
            {
                headers: {"Content-Type": "multipart/form-data"},
                data
            }
        ).then(response => response.data)
    },
    deleteImage: (image_id) => {
        return instance.delete(
            'images',
            {data: {image_id}}
        ).then(response => response.data)
    },
    addTags: (images) => {
        return instance.post(
            'addTags',
            {data: {images: JSON.stringify(images)}}
        ).then(response => response.data)
    }
}
