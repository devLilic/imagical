import React from 'react';
import ImageItem from "@/Components/LocalImages/ImageItem";

const ImagesList = ({images, onSelectImage, gridCols = 8, height}) => {
    return (
        <div className={`h-${height} overflow-y-scroll grid gap-y-3 gap-x-3 grid-cols-${gridCols}`}>
            {images.map(image => <ImageItem key={image.id} image={image}
                                            selectImage={onSelectImage && onSelectImage.bind(null, image.url)}/>)}
        </div>
    );
};

export default ImagesList;
