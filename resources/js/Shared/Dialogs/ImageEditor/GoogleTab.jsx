import React, {useContext, useEffect, useRef, useState} from 'react';
import ImagesContext from "@/Store/ImagesStore/images-context";
import {Button, Input, TabPanel} from "@material-tailwind/react";
import Loading from "@/Components/UI/Svg/Loading";
import 'react-image-crop/dist/ReactCrop.css';
import CropBlock from "@/Shared/Dialogs/ImageEditor/Crop/CropBlock";
import ExternalImagesList from "@/Components/ExternalImages/ExternalImagesList";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ExternalLink from "@/Components/UI/Svg/ExternalLink";

const GoogleTab = (props) => {
    const imagesCtx = useContext(ImagesContext);
    const articleCtx = useContext(ArticlesContext);

    const googleLink = useRef('')

    const [searchQuery, setSearchQuery] = useState({appQuery: imagesCtx.external.query, linkToGoogle: ''})

    useEffect(() => {
        setSearchQuery({appQuery: imagesCtx.external.query, linkToGoogle: makeLinkQuery(imagesCtx.external.query)});
    }, [imagesCtx.external.query])

    const makeLinkQuery = (query) => {
        return `https://www.google.com/search?q=${query.split(' ').join('+')}&source=lnms&tbm=isch`
    }
    const setImage = () => {
        imagesCtx.cropImage()
        props.hideDialog();
    }

    const handleSearchQueryChange = (event) => {
        setSearchQuery({appQuery: event.target.value, linkToGoogle: makeLinkQuery(event.target.value)})
    }

    const handleSearchClick = () => {
        imagesCtx.requestSearchExternalImages(searchQuery.appQuery, null, articleCtx.articleToEdit);
    }

    const handleGoogleImageLink = () => {
        const link = googleLink.current.value
        imagesCtx.selectExternalImage(link)
    }

    return (
        <TabPanel key='external' value='external' className='w-full'>
            {imagesCtx.external.error && <div
                className='w-full h-96 flex justify-center items-center uppercase text-4xl text-red-500 font-bold'>{imagesCtx.external.error}</div>}

            {imagesCtx.external.loading && <div className='h-96 flex justify-center'>
                <Loading/>
            </div>}
            {!imagesCtx.external.error && !imagesCtx.external.loading && <div>
                <div className='w-8/12 mx-auto flex justify-between'>
                    <div className='flex w-6/12'>
                        <Input className='text-center' label='Caută pe Google' value={searchQuery.appQuery}
                               onChange={handleSearchQueryChange}/>
                        <Button className='mx-2' onClick={handleSearchClick}>Caută</Button>
                    </div>
                    <a
                        className='bg-blue-500 flex items-center justify-between px-3 text-white rounded-lg shadow-md'
                        href={searchQuery.linkToGoogle}
                        target='_blank'><span className="mr-2">Deschide Google </span><span className='mb-1'><ExternalLink /></span></a>
                </div>
                <h2 className='text-xl text-gray-900 py-2 text-center'>
                    Rezultate pentru "{imagesCtx.external.query}"
                </h2>
                <div className='flex w-full items-start justify-between'>

                    <ExternalImagesList selectExternalImage={imagesCtx.selectExternalImage}/>

                    <div className='w-4/12'>
                        <div className='mx-2'>
                            <div className='mb-3 flex'>
                                <input type='text'
                                       ref={googleLink}
                                       placeholder='Copy image link'
                                       className='w-full rounded-md'/>
                                <Button className='ml-2' onClick={handleGoogleImageLink}>Get</Button>
                            </div>
                            {imagesCtx.external.selected.croppedUrl?.url && <div>
                                <img src={imagesCtx.external.selected.croppedUrl?.url} alt=''/>
                            </div>}

                            {imagesCtx.external.selected.loading ?
                                (<div className='h-56 flex justify-center'>
                                    <Loading/>
                                </div>) :
                                (!imagesCtx.external.selected.croppedUrl?.url &&
                                    imagesCtx.external.selected.url &&
                                    <CropBlock image={imagesCtx.external.selected}
                                               handleCrop={imagesCtx.setCropSection}/>)}

                        </div>
                        <div className='w-full'>
                            {imagesCtx.external.selected.url &&
                                (<div className='px-2 mt-2 flex justify-between items-center'>
                                    <div>
                                        <Button size='sm' onClick={setImage}>Set</Button>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>}
        </TabPanel>
    );
};

export default GoogleTab;
