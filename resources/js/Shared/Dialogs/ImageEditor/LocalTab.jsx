import React, {useContext, useEffect, useState} from 'react';
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import {Input, TabPanel} from "@material-tailwind/react";
import Loading from "@/Components/UI/Svg/Loading";

const LocalTab = ({onSelectImage}) => {
    const imagesCtx = useContext(ImagesContext);

    const [searchTag, setSearchTag] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTag !== '') {
                imagesCtx.searchLocalImages(searchTag)
            } else {
                imagesCtx.resetImages()
            }
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [searchTag])

    const handleSearchTag = event => {
        setSearchTag(event.target.value)
    }

    const relevantImagesList = imagesCtx.relevant.images.map(image => <div className='text-center' key={image.id}>
        <img src={image.url} onClick={onSelectImage.bind(null, image.url)} className='cursor-pointer mb-1'/>
        <div className='flex flex-wrap justify-center'>
            {image.tags.map(tag => <span key={tag.id}
                                         className='px-2 text-xs text-gray-800 bg-yellow-100 mx-1 border border-yellow-500 rounded'>{tag.title}</span>)}
        </div>
    </div>)

    const localImagesList = imagesCtx.local.images.map(image => <div className='text-center' key={image.id}>
        <img src={image.url} onClick={onSelectImage.bind(null, image.url)} className='cursor-pointer mb-1'/>
        <div className='flex flex-wrap justify-center'>
            {image.tags.map(tag => <span key={tag.id}
                                         className='px-2 text-xs text-gray-800 bg-yellow-100 mx-1 border border-yellow-500 rounded'>{tag.title}</span>)}
        </div>
    </div>)

    return (
        <TabPanel key='local' value='local' className='w-full'>
            <div className="my-2 w-3/12 mx-auto">
                <Input label='Caută imagini după tag'
                       className="text-center"
                       value={searchTag}
                       onChange={handleSearchTag}
                />
            </div>
            <div>
                {imagesCtx.relevant.images.length > 0 && (<div>
                    <h2>Relevante</h2>
                    <div className='grid grid-cols-8 grid-rows-1 gap-x-3 mb-5'>
                        {relevantImagesList}
                    </div>
                </div>)}
                {imagesCtx.local.images.length > 0 && (<div>
                    {searchTag ?  <h2>Rezultate pentru "{searchTag}"</h2> :  <h2>Toate imaginile</h2>}
                    {imagesCtx.local.loading ? <Loading/> :
                        <div className='grid grid-cols-7 grid-rows-2 gap-y-3 gap-x-3'>
                            {localImagesList}
                        </div>
                    }
                </div>)}
                {!imagesCtx.local.images.length > 0 && <h2>Nu am găsit nimic</h2>}
            </div>
        </TabPanel>
    );
};

export default LocalTab;
