import React from 'react';
import {Button} from "@material-tailwind/react";

const ArticleFooter = ({showIntro, editArticle, isIntroDisplayed, content}) => {
    return (
        <div
            className='mb-3 px-2 flex flex-col items-center justify-center border-t border-blue-500 border-dashed pt-3'>
            <div className='flex justify-between w-full'>
                <Button variant="outlined"
                        size="sm"
                        onClick={showIntro}
                >Intro</Button>

                <Button variant='outlined'
                        color='amber'
                        size='sm'
                        type='button'
                        onClick={editArticle}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </Button>
            </div>
            {isIntroDisplayed && <p className='mt-1'>{content}</p>}
        </div>
    );
};

export default ArticleFooter;
