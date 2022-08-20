import React, {useContext, useEffect, useState} from 'react';
import Checkbox from "@/Components/UI/FormElements/Checkbox";
import Label from "@/Components/UI/FormElements/Label";
import Card from "@/Components/UI/Card";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import UploadButton from "@/Components/UI/UploadButton/UploadButton";


export default function Article({article, handleModal}) {

    const articlesCtx = useContext(ArticlesContext);

    const [customTitle, setCustomTitle] = useState('')

    const showIntro = (id) => {
        articlesCtx.showIntro(id)
    }

    const editSearchOption = (id, search_type, search_value) => {
        articlesCtx.editSearch(id, search_type, search_value)
    }

    const editArticle = () => {
        articlesCtx.setArticleToEdit(article.id);
        handleModal()
    }

    const removeWallpaper = () => {
        articlesCtx.removeWallpaper(article.id)
    }

    return (
        <Card>
            <div className='px-3 py-2 text-sm font-bold text-center bg-blue-500 text-white'>
                {article.search.value} ({article.type})
                <div className="text-xs">{article.id}</div>
            </div>
            {article.images.wallpaper && <div className='relative'>
                <img src={article.images.wallpaper} className='w-full'/>
                <button
                    className='absolute right-1 bottom-1 text-xs text-white border border-transparent hover:border-white hover:bg-red-800 rounded px-1 py-1'
                    onClick={removeWallpaper}
                >Remove image</button>
            </div>}

            {!article.images.wallpaper &&
                <div className="bg-blue-100 text-blue-600">
                    <div>
                        <Label className='flex justify-between items-center hover:bg-blue-300'>
                            <div className="px-2">
                                <Checkbox name={article.id + "_slug"}
                                          value={article.search.value}
                                          checked={article.search.field === 'slug'}
                                          handleChange={editSearchOption.bind(null, article.id, 'slug', article.search.value)}
                                />
                            </div>
                            <div className="p-2 w-full font-bold text-sm pl-3">{article.search.value}</div>
                        </Label>

                        <Label className='flex justify-between items-center hover:bg-blue-300'>
                            <div className="px-2">
                                <Checkbox name={article.id + "_title"}
                                          value={article.title}
                                          checked={article.search.field === 'title'}
                                          handleChange={editSearchOption.bind(null, article.id, 'title', article.title)}
                                />
                            </div>
                            <div className="p-2 w-full font-bold text-sm pl-3">{article.title}</div>

                        </Label>

                        <Label className='flex justify-between items-center hover:bg-blue-300'>
                            <div className="px-2">
                                <Checkbox name={article.id + "_other"}
                                          checked={article.search.field === 'custom'}
                                          handleChange={editSearchOption.bind(null, article.id, 'custom', customTitle)}
                                />
                            </div>
                            <div className="p-2 w-full">
                                <input value={customTitle}
                                       onChange={(e) => setCustomTitle(e.target.value)}
                                       placeholder="Alte idei"
                                       className="w-10/12 text-sm px-2 py-1 bg-transparent border-b border-b-2 border-b-blue-500 text-blue-600 outline-none placeholder:text-blue-400"/>
                            </div>
                        </Label>
                    </div>
                </div>
            }

            <div className='my-3 px-2 flex flex-col items-center justify-center'>
                <div className='flex justify-between w-full'>
                    <button type='button'
                            className='px-4 py-2 bg-white rounded-md font-semibold text-sm text-blue-500 uppercase border border-blue-300 hover:bg-blue-100'
                            onClick={showIntro.bind(null, article.id)}>Intro
                    </button>
                    <button type='button'
                            className='px-4 py-2 bg-white rounded-md font-semibold text-sm text-blue-500 uppercase border border-blue-300 hover:bg-blue-100'
                            onClick={editArticle}
                    >Select Image
                    </button>
                </div>
                {article.isIntroDisplayed && <p className='mt-1'>{article.content}</p>}
            </div>
        </Card>
    );
}
