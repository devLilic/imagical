import React from 'react';
import Loading from "@/Components/UI/Svg/Loading";
import ImagesList from "@/Components/LocalImages/ImagesList";

const LocalImages = ({images, title, onSelectImage, loading, className}) => {
    return (
        <div className='px-2'>
            {images.length > 0 && (<>
                <h2>{title}</h2>
                {loading ? <Loading/> : <ImagesList className={className} images={images} onSelectImage={onSelectImage}/>}
            </>)}
        </div>
    );
};

export default LocalImages;
