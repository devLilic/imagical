import React, {FC} from 'react';
import TagsList from "@/Components/LocalImages/TagsList";
import {ImageType} from "../../Store/ImagesStore/types/Image";

type PropsType = {
    image: ImageType
    selectImage: React.MouseEventHandler<HTMLImageElement>
}

const ImageItem: FC<PropsType> = ({image, selectImage}) => {
    return (
        <div className='text-center'>
            <img src={image.url} onClick={selectImage} className='cursor-pointer mb-1'/>
            <div className='flex flex-wrap justify-center'>
                <TagsList tags={image.tags}/>
            </div>
        </div>
    );
};

export default ImageItem;
