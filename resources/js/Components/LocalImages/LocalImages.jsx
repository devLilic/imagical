import React from 'react';
import Loading from "@/Components/UI/Svg/Loading";
import ImagesList from "@/Components/LocalImages/ImagesList";

const LocalImages = ({images, title, onSelectImage, loading, cols, height}) => {
    return (
        <div>
            {images.length > 0 && (<>
                <h2>{title}</h2>
                {loading ? <Loading/> : <ImagesList images={images} onSelectImage={onSelectImage} gridCols={cols} height={height}/>}
            </>)}
        </div>
    );
};

export default LocalImages;
