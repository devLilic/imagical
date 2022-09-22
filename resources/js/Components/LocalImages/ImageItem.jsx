import React from 'react';
import TagsList from "@/Components/LocalImages/TagsList";

const ImageItem = ({image, selectImage}) => {
    return (
        <div className='text-center'>
            <img src={image.url} onClick={selectImage} className='cursor-pointer mb-1'/>
            <div className='flex flex-wrap justify-center'>
                <TagsList tags={image.tags} />
            </div>
        </div>
    );
};

export default ImageItem;
