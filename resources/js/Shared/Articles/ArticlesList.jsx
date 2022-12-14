import React, {useContext, useState} from 'react';
import Article from "@/Components/Article/Article";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ImageEditorDialog from "@/Shared/Dialogs/ImageEditorDialog";
import {Button} from "@material-tailwind/react";
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import {saveAs} from 'file-saver';
import NewArticleDialog from "@/Shared/Dialogs/NewArticleDialog";

const ArticlesList = () => {
    const articlesCtx = useContext(ArticlesContext)
    const imagesCtx = useContext(ImagesContext)

    const [editorDialogOpen, setEditorDialogOpen] = useState(false)
    const [newArticleDialogOpen, setNewArticleDialogOpen] = useState(false  )
    const handleEditorDialog = () => {
        setEditorDialogOpen(prevState => !prevState)
    }

    const handleNewArticleDialog = (article_id) => {
        articlesCtx.setArticleToEdit(article_id)
        setNewArticleDialogOpen(prevState => !prevState);
    }

    const saveImages = () => {
        let counter = 1;
        articlesCtx.articles.map(article => {

            if (article.images.wallpaper) {
                saveAs(`${article.images.wallpaper}`, `${counter}_${article.slug}.jpg`)
            }
            counter++
        })
    }

    const addNewArticle = (title, type) => {
        articlesCtx.addNewArticle(title, type, articlesCtx.articleToEdit)
    }

    return (
        <div className="shadow-sm sm:rounded-lg">
            <div className='grid grid-cols-4 gap-x-5'>
                {articlesCtx.articles && (
                    articlesCtx.articles.map(article =>
                        <Article key={article.id}
                                 article={article}
                                 handleEditorDialog={handleEditorDialog}
                                 handleNewArticleDialog={handleNewArticleDialog}
                                 loading={imagesCtx.external.selected.loading}/>
                    )
                )}
            </div>
            <div className='text-center my-2'>
                <Button className="mb-3" onClick={saveImages}>Save</Button>
            </div>
            <ImageEditorDialog dialogOpen={editorDialogOpen} handleDialog={handleEditorDialog}/>
            <NewArticleDialog dialogOpen={newArticleDialogOpen} handleDialog={handleNewArticleDialog} saveArticle={addNewArticle}/>
        </div>
    );
};

export default ArticlesList;
