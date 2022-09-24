import React, {useContext} from 'react';
import {Input} from "@material-tailwind/react";
import Label from "@/Components/UI/FormElements/Label";
import Card from "@/Components/UI/Card";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ArticleHeader from "@/Components/Article/ArticleHeader";
import ContentWithImage from "@/Components/Article/ContentWithImage";
import ArticleFooter from "@/Components/Article/ArticleFooter";
import Checkbox from "@/Components/UI/FormElements/Checkbox";
import Loading from "@/Components/UI/Svg/Loading";

export default function Article({article, handleEditorDialog, handleNewArticleDialog, loading}) {

    const articlesCtx = useContext(ArticlesContext);

    const editSearchOption = (search_type) => {
        articlesCtx.editSearch(article.id, search_type)
    }

    const editArticle = () => {
        articlesCtx.setArticleToEdit(article.id);
        handleEditorDialog();
    }

    const removeWallpaper = () => {
        articlesCtx.removeWallpaper(article.id)
    }

    const showIntro = () => {
        articlesCtx.showIntro(article.id)
    }

    const setCustomTitle = (event) => {
        articlesCtx.addCustomTitle(article.id, event.target.value)
    }

    return (
        <Card>
            <ArticleHeader title={article.slug} type={article.type} addArticle={handleNewArticleDialog.bind(null, article.id)}/>

            {(loading && article.id === articlesCtx.articleToEdit) ?
                (<div className='h-32 flex justify-center'>
                    <Loading/>
                </div>) :
                (article.images.wallpaper ?
                        (<ContentWithImage wallpaper={article.images.wallpaper} removeWallpaper={removeWallpaper}/>) :
                        <div className="text-blue-600">
                            <Label className='flex items-center py-1'>
                                <Checkbox id={article.id + "_slug"}
                                          isChecked={article.search_by === 'slug'}
                                          onChange={editSearchOption.bind(null, 'slug')}
                                />
                                <span>{article.slug}</span>
                            </Label>

                            <Label className='flex items-center mr-2'>
                                <Checkbox id={article.id + "_title"}
                                          isChecked={article.search_by === 'title'}
                                          onChange={editSearchOption.bind(null, 'title')}
                                />
                                <div>{article.title}</div>
                            </Label>

                            <Label className='flex justify-between items-center mt-2 mr-2 mb-5'>
                                <Checkbox id={article.id + "_custom"}
                                          isChecked={article.search_by === 'custom'}
                                          onChange={editSearchOption.bind(null, 'custom')}
                                />
                                <Input label='Alte idei'
                                       value={article.custom}
                                       onChange={setCustomTitle}
                                />
                            </Label>
                        </div>
                )
            }

            <ArticleFooter showIntro={showIntro}
                           editArticle={editArticle}
                           isIntroDisplayed={article.isIntroDisplayed}
                           content={article.content}
            />
        </Card>
    );
}
