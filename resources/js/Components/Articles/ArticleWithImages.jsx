import React, {useState} from 'react';
import DisplayError from "@/Components/DisplayError"
import Image from "@/Components/Articles/Image";
import SelectedImage from "@/Components/Images/SelectedImage";


export default function ArticleWithImages({article}) {

    const [selectedImage, setSelectedImage] = useState({})

    function onChangeSelectedImage(e){
        let img = article.images.items.filter(image => image.image.thumbnailLink === e.target.currentSrc);
        setSelectedImage({
            link: img[0].link,
            displayLink: img[0].displayLink,
            contextLink: img[0].image.contextLink,
            width: img[0].image.width,
            height: img[0].image.height,
        });
    }

    return (
        <div className="mx-2 my-3 bg-blue-100 rounded-sm">
            <div className="w-full flex flex-col border border-blue-300 rounded-sm p-2">
                {(article.images.error && article.images.error.code===429) ? (
                    <>
                        <DisplayError error="Depasita limita de interogari la Google"/>
                    </>
                ) : (
                    <>
                        <div className='flex'>
                            <div className="w-8/12 border-r border-blue-300">
                                <div className='px-2 p-4'>
                                    <h3 className="py-2">{article.id} - Resultate pentru <span className="font-bold">"{article.query}"</span></h3>
                                </div>
                                <div className="flex flex-wrap">
                                    {article.images.items.map((image) => (
                                        <Image image={image} key={image.link} onChangeSelectedImage={onChangeSelectedImage}/>
                                    ))}
                                </div>
                            </div>
                            <SelectedImage image={selectedImage} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
