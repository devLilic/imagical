import React, {useContext, useEffect, useState} from 'react';
import {Button} from "@material-tailwind/react";
import ExternalImageItem from "@/Components/ExternalImages/ExternalImageItem";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ImagesContext from "@/Store/LocalImagesStore/images-context";

const ExternalImagesList = ({selectExternalImage}) => {
    const articleCtx = useContext(ArticlesContext)
    const imagesCtx = useContext(ImagesContext);
    let [images, setImages] = useState(imagesCtx.external.images[articleCtx.articleToEdit]);

    useEffect(() => {
        setImages(imagesCtx.external.images[articleCtx.articleToEdit]);
    }, [articleCtx.articleToEdit, imagesCtx.external.images[articleCtx.articleToEdit]])

    return (
        <div className='w-7/12 overflow-y-scroll pr-2 h-96'>
            <div className="grid grid-cols-7 grid-rows-3 gap-y-3 gap-x-3">
                {images && images.map(image => <ExternalImageItem key={image.id} image={image}
                                                                  selectExternalImage={selectExternalImage.bind(null, image.url)}/>)}
                <Button
                    className='bg-transparent border border-purple-500 text-purple-800 hover:text-white hover:bg-purple-400'
                    onClick={imagesCtx.loadMore}
                >Load more</Button>
            </div>
        </div>
    );
};

export default ExternalImagesList;
