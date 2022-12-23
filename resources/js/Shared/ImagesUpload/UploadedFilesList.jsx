import React, {useContext} from 'react';
import FilesContext from "@/Store/UploadFiles/files-context";
import {Button} from "@material-tailwind/react";

const UploadedFilesList = () => {
    const filesCtx = useContext(FilesContext);



    return (
        <>
            {filesCtx.files.length !== 0 && (<div className='border border-blue-200 px-2 py-2'>
                <h2 className='text-xl font-bold uppercase mb-2 text-center'>Imagini încărcate</h2>
                <div className='grid grid-cols-4 gap-5 mb-2'>
                    {filesCtx.files.map(file =>
                        <div key={file.id} className='bg-blue-200 relative rounded-t overflow-hidden'>
                            <div className='w-full'>
                                <img src={file.url}/>
                            </div>
                            <div className='w-full px-2 py-3'>
                                <input type="text" className='border-blue-500 text-xs w-full rounded' placeholder='Add tags'
                                       value={file.tags} onChange={filesCtx.addTags.bind(null, file.id)}/>
                            </div>
                            <button type='button'
                                onClick={filesCtx.deleteImage.bind(null, file.id)}
                                    className='absolute top-2 right-2 border border-red-600 px-1 text-xs hover:bg-red-400 hover:text-white rounded'
                            >&times;</button>
                        </div>
                    )}
                </div>
                <div className='text-center'>
                    <Button type='button' onClick={filesCtx.saveTags}>Save</Button>
                </div>
            </div>)}
        </>
    );
};

export default UploadedFilesList;
