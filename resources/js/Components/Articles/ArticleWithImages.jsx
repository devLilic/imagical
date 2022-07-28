import React, {useEffect, useState} from 'react';
import DisplayError from "@/Components/DisplayError"


export default function ArticleWithImages({article}) {

    const [selectedImage, setSelectedImage] = useState({})

    function onChangeSelectedImage(e){
        let img = article.images.items.filter(image => image.image.thumbnailLink === e.target.currentSrc);
        setSelectedImage({
            link: img[0].link,
            displayLink: img[0].displayLink,
            contextLink: img[0].contextLink,
            width: img[0].image.width,
            height: img[0].image.height,
        });
    }

    return (
        <div className="mx-2 my-3 bg-blue-100 rounded-sm">
            <div className="w-full flex flex-col border border-blue-300 rounded-sm p-2">
                {(article.images.error && article.images.error.code===429) ? (
                    <><DisplayError error="Depasita limita de interogari la Google"/>
                        <div className='text-center'>Depasita limita de interogari la Google</div></>
                ) : (
                    <>
                        <div className='flex'>
                            <div className="w-8/12 border-r border-blue-300">
                                <div className='px-2 p-4'>
                                    <h3 className="py-2">{article.id} - Resultate pentru <span className="font-bold">"{article.query}"</span></h3>
                                </div>
                                <div className="flex flex-wrap">
                                    {article.images.items.map((image) => (
                                        <div className="px-2 mb-2">
                                            <img key={image.link} onClick={onChangeSelectedImage} src={image.image.thumbnailLink} width={image.image.thumbnailWidth} height={image.image.thumbnailHeight}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-4/12 ml-2 pt-8">
                                {selectedImage.link && (<div>
                                    <img className="w-full" src={selectedImage.link} alt=""/>
                                    <div className="mt-2">
                                        <p><span className='font-bold'>{selectedImage.displayLink}</span> ({selectedImage.width} x {selectedImage.height})</p>
                                        <p><a className="underline text-blue-800 hover:text-red-400 text-sm" target="_blank" href={selectedImage.contextLink}>
                                            Vezi articol >>>
                                        </a></p>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
