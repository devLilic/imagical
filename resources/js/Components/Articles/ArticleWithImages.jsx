import React, {useState} from 'react';
import DisplayError from "@/Components/UI/DisplayError"
import Image from "@/Components/Articles/Image";
import SelectedImage from "@/Components/Images/SelectedImage";
import Card from "@/Components/UI/Card";

export default function ArticleWithImages({article, editImage}) {

    const [selectedImage, setSelectedImage] = useState({})

    function handleSelectedImage(e, query) {
        let img = article.images.items.filter(image => image.image.thumbnailLink === e.target.currentSrc);
        const selected = {
            link: img[0].link,
            displayLink: img[0].displayLink,
            contextLink: img[0].image.contextLink,
            width: img[0].image.width,
            height: img[0].image.height,
            title: query
        }
        setSelectedImage(selected);
        editImage(selected);
    }

    return (
        <Card>
            {(article.images.error && article.images.error.code === 429) ? (
                <>
                    <DisplayError error="Depasita limita de interogari la Google"/>
                </>
            ) : (
                <>
                    <div className='flex'>
                        <div className="w-8/12 border-r border-blue-300">
                            <div className='px-2 p-4'>
                                <h3 className="py-2">{article.id} - Resultate pentru <span
                                    className="font-bold">"{article.query}"</span></h3>
                            </div>
                            <div className="flex flex-wrap">
                                {article.images.items.map((image) => (
                                    <Image image={image} key={image.link}
                                           onChangeSelectedImage={e => handleSelectedImage(e, article.query)}/>
                                ))}
                            </div>
                        </div>

                        <SelectedImage image={selectedImage}/>
                    </div>
                </>
            )}
        </Card>
    );
}
