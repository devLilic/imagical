import React, {FC, useContext, useEffect, useState} from 'react';
import {Button} from "@material-tailwind/react";
import ExternalImageItem from "@/Components/ExternalImages/ExternalImageItem";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ImagesContext from "@/Store/ImagesStore/images-context";
import {ArticlesContextType} from "@/Store/ArticleStore/articles-context";
import {ImagesContextType} from '@/Store/ImagesStore/images-context';

type PropsType = {
    selectExternalImage: ()=> void
}

const ExternalImagesList: FC<PropsType> = ({selectExternalImage}) => {
    const articleCtx = useContext<ArticlesContextType>(ArticlesContext)
    const imagesCtx = useContext<ImagesContextType>(ImagesContext);
    let [images, setImages] = useState(imagesCtx.external.images[articleCtx.articleToEdit]);

    useEffect(() => {
        setImages(imagesCtx.external.images[articleCtx.articleToEdit]);
    }, [articleCtx.articleToEdit, imagesCtx.external.images[articleCtx.articleToEdit]])

    return (
        <div className='w-8/12 overflow-y-auto h-[500px] pr-4 text-center'>
            <div className="grid grid-cols-5 gap-y-1 gap-x-1 mb-3">
                {images && images.map(image => <ExternalImageItem key={image.id} image={image}
                                                                  selectExternalImage={selectExternalImage.bind(null, image.url)}/>)}

            </div>
            <Button
                className='bg-transparent border border-purple-500 text-purple-800 hover:text-white hover:bg-purple-400'
                onClick={imagesCtx.loadMore.bind(null, articleCtx.articleToEdit)}
            >Load more</Button>
        </div>
    );
};

export default ExternalImagesList;
