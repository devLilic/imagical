import React from 'react';
import ImageItem from "@/Components/LocalImages/ImageItem";

const ImagesList = ({images, onSelectImage, className}) => {
    return (
        <div className={`pr-3 overflow-y-scroll grid gap-y-3 gap-x-3 ${className}`}>
            {images.map(image => <ImageItem key={image.id} image={image}
                                            selectImage={onSelectImage && onSelectImage.bind(null, image.url)}/>)}
        </div>
    );
};

export default ImagesList;
