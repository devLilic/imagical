import React, {FC} from 'react';
import ImageItem from "@/Components/LocalImages/ImageItem";
import {ImageType} from "../../Store/ImagesStore/types/Image";

type PropsType = {
    images: ImageType[]
    onSelectImage: () => void
    className: string
}

const ImagesList: FC<PropsType> = ({images, onSelectImage, className}) => {
    return (
        <div className={`pr-3 overflow-y-scroll grid gap-y-3 gap-x-3 ${className}`}>
            {images.map(image => <ImageItem key={image.id} image={image}
                                            selectImage={onSelectImage && onSelectImage.bind(null, image.url)}/>)}
        </div>
    );
};

export default ImagesList;
