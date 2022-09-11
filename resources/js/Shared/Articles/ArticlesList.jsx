import React, {useContext, useState} from 'react';
import Article from "@/Components/Article/Article";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ImageEditorDialog from "@/Shared/Dialogs/ImageEditorDialog";
import {Button} from "@material-tailwind/react";
import ImagesContext from "@/Store/LocalImagesStore/images-context";

const ArticlesList = () => {
    const articlesCtx = useContext(ArticlesContext)
    const imagesCtx = useContext(ImagesContext)

    const [dialogOpen, setDialogOpen] = useState(false)
    const handleDialog = () => {
        setDialogOpen(prevState => !prevState)
    }

    const saveImages = () => {
        let counter = 1;
        articlesCtx.articles.map(article => {

            // if (article.images.wallpaper) {
            //     let downloading = browser.downloads.download({
            //         url : article.images.wallpaper,
            //         filename : `${counter}_${article.slug}.jpg`,
            //     });
            //     downloading()
            //     console.log(`${counter}_${article.slug}`)
            //     counter++;
            // }
        })
    }

    return (
        <div className="shadow-sm sm:rounded-lg">
            <div className='grid grid-cols-4 gap-x-5'>
                {articlesCtx.articles && (
                    articlesCtx.articles.map(article =>
                        <Article key={article.id} article={article} handleModal={handleDialog}
                                 loading={imagesCtx.external.selected.loading}/>
                    )
                )}
            </div>
            <div className='text-center my-2'>
                <Button className="mb-3" onClick={saveImages}>Save</Button>
            </div>
            <ImageEditorDialog dialogOpen={dialogOpen} handleDialog={handleDialog}/>
        </div>
    );

};

export default ArticlesList;
