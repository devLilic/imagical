import React, {FC} from 'react';
import {IExternalImage} from "@/Store/ImagesStore/types/Image";
import ExternalLink from "@/Components/UI/Svg/ExternalLink";

interface IExternalImageItemProps {
    image: IExternalImage,
    selectExternalImage: () => void
}

const ExternalImageItem = ({image, selectExternalImage}: IExternalImageItemProps) => {
    return (
        <div
            className='border border-gray-500 rounded-sm overflow-hidden text-center flex flex-col items-center justify-between flex-nowrap relative'>
            <img src={image.url} onClick={selectExternalImage}
                 className='cursor-pointer'/>
            <div className='absolute top-1 right-1'>
                <a target='_blank' className='p-1 bg-transparent block rounded hover:bg-white'
                   href={image.article_url} title={image.site}>
                    <ExternalLink/>
                </a>
            </div>
            <div className='text-xs'>
                {image.width} x {image.height}
            </div>
        </div>
    );
};

export default ExternalImageItem;
