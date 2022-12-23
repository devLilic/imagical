import ExternalImage from "@/Helpers/ExternalImage";
import {instance} from "@/api/api";
import {IExternalImage, ILocalImage} from "@/Store/ImagesStore/types/Image";

interface IImagesRequest {
    images: ILocalImage[],
    count: number
}

interface IImageApi {
    getImages: () => Promise<IImagesRequest>,
    getRelevant: (search: string) => Promise<ILocalImage[]>,
    getExternal: (search: string, index: number) => Promise<IExternalImage[]>,
    searchImages: (search: string) => Promise<ILocalImage[]>,
    cropImage: (url: string, section: any) => Promise<ILocalImage>
}

export const ImageAPI: IImageApi = {
    getImages: () => instance.get('images')
        .then(response => response.data),

    getRelevant: async (search) => {
        const response = await instance.get<ILocalImage[]>(
            'relevant',
            {params: {search}}
        );
        return response.data
    },

    getExternal: (search, startIndex) => instance.get(
        'resources',
        {params: {search, startIndex}}
    ).then(response => {
            return response.data
                .images.map(image =>
                    new ExternalImage(image.link, image.image.contextLink, image.displayLink, image.image.width, image.image.height))
        }
    ),

    searchImages: (search) => instance.get(
        'search-images',
        {params: {search}}
    ).then(response => response.data),

    cropImage: (url, section) => instance.get(
        'crop',
        {params: {url, section}}
    ).then(response => response.data.image)
}
