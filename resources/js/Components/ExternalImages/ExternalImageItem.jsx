import React from 'react';

const ExternalImageItem = ({image, selectExternalImage}) => {
    return (
        <div
            className='border border-purple-500 rounded-lg overflow-hidden text-center flex flex-col items-center justify-between flex-nowrap'>
            <img src={image.url} onClick={selectExternalImage}
                 className='cursor-pointer'/>
            <div className='text-xs mt-2'>
                <a className='bg-yellow-100 hover:bg-yellow-200 px-2 rounded-lg whitespace-nowrap' target='_blank'
                   href={image.article_url}>{image.site}</a>
            </div>
            <div className='text-xs'>
                {image.width} x {image.height}
            </div>
        </div>
    );
};

export default ExternalImageItem;
