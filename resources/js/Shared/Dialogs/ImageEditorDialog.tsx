import React, {useContext, useEffect} from 'react';
import Dialog from "@/Components/UI/Dialog";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ImagesContext from "@/Store/ImagesStore/images-context";
import Tabs from "@/Shared/Dialogs/ImageEditor/Tabs";
import {IArticlesContext} from "@/Store/ArticleStore/types/Article";
import {IImagesContext} from "@/Store/ImagesStore/types/Image";

const ImageEditorDialog = ({dialogOpen, handleDialog}) => {
    const articlesCtx = useContext<IArticlesContext>(ArticlesContext)
    const imagesCtx = useContext<IImagesContext>(ImagesContext)

    const currentArticle = articlesCtx.articleToEdit ? articlesCtx.articles.filter(article => article.id === articlesCtx.articleToEdit) :
        [{slug: 'NO ARTILCE SELECTED', search_by: 'not'}]

    useEffect(() => {
        if (dialogOpen) {
            imagesCtx.searchRelevantImages(currentArticle[0].slug)
            let query = currentArticle[0][currentArticle[0].search_by]
            imagesCtx.searchExternalImages(query);
        }
    }, [dialogOpen])

    const setSelectedImage = (image_url: string) => {
        articlesCtx.addWallpaper(image_url)
        handleDialog();
        imagesCtx.resetImages()
    }

    return (
        <Dialog size="xxl"
                open={dialogOpen}
                handleDialog={handleDialog}
                title={currentArticle[0].slug}
                closeBtn={true}>
            <Tabs selectImage={setSelectedImage} hideDialog={handleDialog}/>
        </Dialog>
    );
};

export default ImageEditorDialog;
