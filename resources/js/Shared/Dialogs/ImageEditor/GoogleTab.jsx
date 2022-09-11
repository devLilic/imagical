import React, {useContext} from 'react';
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import {Button, Input, TabPanel} from "@material-tailwind/react";
import Loading from "@/Components/UI/Svg/Loading";
import 'react-image-crop/dist/ReactCrop.css';
import CropBlock from "@/Shared/Dialogs/ImageEditor/Crop/CropBlock";

const GoogleTab = (props) => {
    const imagesCtx = useContext(ImagesContext);

    const setImage = () => {
        imagesCtx.cropImage()
        props.hideDialog();
    }

    const googleImages = imagesCtx.external.images.map(image => <div
        className='border border-purple-500 rounded-lg overflow-hidden text-center flex flex-col items-center justify-start flex-nowrap'
        key={image.id}>
        <img src={image.url} onClick={imagesCtx.selectExternalImage.bind(null, image.url)} className='cursor-pointer'/>
        <div className='text-xs mt-2'>
            <a className='bg-yellow-100 hover:bg-yellow-200 px-2 rounded-lg whitespace-nowrap' target='_blank'
               href={image.article_url}>{image.site}</a>
        </div>
        <div className='text-xs'>
            {image.width} x {image.height}
        </div>
    </div>)

    return (
        <TabPanel key='external' value='external' className='w-full'>
            {imagesCtx.external.loading && <div className='h-96 flex justify-center'>
                <Loading/>
            </div>}
            {!imagesCtx.external.loading && <div>
                <h2 className='text-xl text-gray-900 py-2 text-center'>Rezultate pentru
                    "{imagesCtx.external.query}"</h2>
                <div className='flex w-full items-start justify-between'>
                    <div className="w-7/12 grid grid-cols-6 grid-rows-3 gap-y-3 gap-x-3">
                        {googleImages}
                        <Button
                            className='bg-transparent border border-purple-500 text-purple-800 hover:text-white hover:bg-purple-400'>Load
                            more</Button>
                    </div>
                    <div className='w-4/12'>
                        <div className='mx-2'>

                            {imagesCtx.external.selected.croppedUrl?.url && <div>
                                <img src={imagesCtx.external.selected.croppedUrl?.url}/>
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
                                    <div className='w-7/12'>
                                        <Input label='Tags' className='text-xs '/>
                                    </div>
                                    <div>
                                        <Button size='sm'>Save</Button>
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
