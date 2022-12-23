import React, {FC} from 'react';
import Loading from "@/Components/UI/Svg/Loading";
import ImagesList from "@/Components/LocalImages/ImagesList";
import {ImageType} from '@/Store/ImagesStore/types/Image';

type PropsType = {
    images: ImageType[]
    title: string
    onSelectImage?: () => void
    loading: boolean
    className: string
}


const LocalImages: FC<PropsType> = ({images, title, onSelectImage, loading, className}) => {
    return (
        <div className='px-2'>
            {images.length > 0 && (<>
                <h2>{title}</h2>
                {loading ? <Loading/> :
                    <ImagesList className={className} images={images} onSelectImage={onSelectImage}/>}
            </>)}
        </div>
    );
};

export default LocalImages;
