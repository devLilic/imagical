import React, {useContext, useState} from 'react';
import Dialog from "@/Components/UI/Dialog";
import {Input, Radio} from "@material-tailwind/react";
import ArticlesContext from "@/Store/ArticleStore/articles-context";

const NewArticleDialog = ({dialogOpen, handleDialog, saveArticle}) => {
    const [newArticleTitle, setNewArticleTitle] = useState('')
    const [newArticleType, setNewArticleType] = useState('BETA')

    const changeTitle = event => {
        setNewArticleTitle(prevState => event.target.value)
    }

    const changeType = event => {
        setNewArticleType(prevState => event.target.value)
    }

    const resetForm = () => {
        setNewArticleTitle('')
        setNewArticleType('BETA')
    }

    const saveNewArticle = () => {
        saveArticle(newArticleTitle, newArticleType)
        handleDialog()
        resetForm()

    }
    return (
        <Dialog size="sm"
                open={dialogOpen}
                handleDialog={handleDialog}
                title="Articol Nou"
                confirmBtn={true}
                confirmText='Save'
                confirmAction={saveNewArticle}
                cancelBtn={true}
        >
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full mb-3'>
                    <Input label='Titlu' size='lg' value={newArticleTitle} onChange={changeTitle}/>
                </div>
                <div className='py-2 h-15 flex justify-around w-8/12'>
                    <Radio id='BETA'
                           name='type'
                           value='BETA'
                           label='BETA'
                           checked={newArticleType === 'BETA'}
                           onChange={changeType}
                    />
                    <Radio id='OFF'
                           name='type'
                           value='OFF'
                           label='OFF'
                           checked={newArticleType === 'OFF'}
                           onChange={changeType}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default NewArticleDialog;
