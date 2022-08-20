import React, {useContext, useEffect, useState} from 'react';
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import Input from "@/Components/UI/FormElements/Input";

const LocalImages = ({onSelectImage, handleModal}) => {
    const [searchImageField, setSearchImageField] = useState('')
    const [showLoader, setShowLoader] = useState(false);
    const imageCtx = useContext(ImagesContext);
    const articleCtx = useContext(ArticlesContext);

    useEffect(() => {
        setShowLoader(true)
        const timer = setTimeout(()=>{
            imageCtx.searchImages(searchImageField)
        }, 500);
        return ()=>{
            clearTimeout(timer);
        }
    }, [searchImageField]);

    const handleImageSelect = (image_url) => {
        articleCtx.addWallpaper(image_url);
        handleModal();
    }

    const handleSearchImage = event => {
        setSearchImageField(event.target.value);
    }

    const imagesList = imageCtx.images.map(image => <div className="flex flex-col" key={image.id}>
        <img src={image.url} className='mb-1 hover:cursor-pointer' onClick={handleImageSelect.bind(null, image.url)}/>
        <div className='flex flex-nowrap items-center justify-center'>
            {!showLoader && image.tags.map(tag =>
                <span key={tag.id} className='text-xs rounded border px-1 bg-yellow-100'> {tag.title} </span>)
            }
            {showLoader && <span>Loading...</span>}
        </div>
    </div>)

    return (
        <div>
            <Input placeholder='Search Image' value={searchImageField} handleChange={handleSearchImage}/>
            <hr/>
            <div className="my-2 grid gap-3 grid-cols-5 grid-rows-4">
                {imagesList}
            </div>
        </div>
    );
};

export default LocalImages;
