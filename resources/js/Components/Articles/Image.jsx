import React from 'react';

export default function Image({image, onChangeSelectedImage}) {
    return (
        <div className="px-2 mb-2">
            <img onClick={onChangeSelectedImage} src={image.image.thumbnailLink}
                 width={image.image.thumbnailWidth} height={image.image.thumbnailHeight}/>
        </div>
    )
}
