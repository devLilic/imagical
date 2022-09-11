import React, {useEffect, useState} from 'react';
import PageContent from "@/Components/UI/PageContent";
import {useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/UI/FormElements/Button";
import axios from "axios";

const MAX_UPLOADS = 20;

const Upload = props => {
    const {uploaded} = props;
    const [uploadedFiles, setUploadedFiles] = useState(uploaded);
    const [fileLimit, setFileLimit] = useState(false)
    const {data, setData, post} = useForm({
        files: [],
    })

    useEffect(() => {
        if (data.files.length) {
            post('/api/upload')
            setData("files", [])
        }
    }, [data])

    useEffect(() => {
        setUploadedFiles(uploaded)
    }, [uploaded]);


    const handleUploadFiles = files => {
        const uploaded = [...data.files];
        let limitExceeded = false;
        files.some(file => {
            if (uploaded.findIndex(f => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_UPLOADS) {
                    setFileLimit(true);
                }
                if (uploaded.length > MAX_UPLOADS) {
                    alert(`Nu poti incarca mai mult de ${MAX_UPLOADS} imagini odata`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true
                }
            }
        })
        if (!limitExceeded) {
            setData('files', uploaded)
        }
    }

    const handleFileEvent = e => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadFiles(choosenFiles);
    }

    const deleteUploadedImage = (id) => {
        axios({
            method: 'delete',
            url: '/api/upload/' + id,
        })
        setUploadedFiles(prevState => prevState.filter(image => image.id !== id));
    }

    const handleAddTags = (id) => {
        console.log(event.target.value, id)
        setUploadedFiles(prevState => {
            return prevState.map(image => {
                if (image.id === id) {
                    image.tags = event.target.value
                }
                return image;
            })
        })
    }

    const handleSaveTags = () => {
        const imagesToUpdate = uploadedFiles.filter(image => image.tags !== '')
        if(imagesToUpdate.length > 0){
            axios({
                method: 'post',
                url: '/api/addTags',
                data: {
                    images: JSON.stringify(imagesToUpdate)
                }
            })
        }
    }

    const uploadedList = <div className='border border-blue-200 px-2 py-2'>
        <h2 className='text-xl font-bold uppercase mb-2 text-center'>Imagini încărcate</h2>
        <div className='grid grid-cols-4 gap-5 mb-2'>
            {uploadedFiles.map(file =>
                <div key={file.id} className='bg-blue-200 relative rounded-t overflow-hidden'>
                    <div className='w-full'>
                        <img src={file.url}/>
                    </div>
                    <div className='w-full px-2 py-3'>
                        <input type="text" className='border-blue-500 text-xs w-full rounded' placeholder='Add tags'
                               value={file.tags} onChange={handleAddTags.bind(null, file.id)}/>
                    </div>
                    <button type='button'
                            onClick={deleteUploadedImage.bind(null, file.id)}
                            className='absolute top-2 right-2 border border-red-600 px-1 text-xs hover:bg-red-400 hover:text-white rounded'
                    >&times;</button>
                </div>
            )}
        </div>
        <div className='text-center'>
            <Button type='button' onClick={handleSaveTags}>Save</Button>
        </div>
    </div>

    return (
        <PageContent auth={props.auth} errors={props.errors} title="Upload titles">
            <form>
                <h2 className='text-xl font-bold uppercase mb-2 text-center'>Adaugă imagini</h2>
                <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
                    <label>
                        <div
                            className='text-3xl text-gray-300 border px-20 py-10 border-dashed border-gray-400 rounded-xl cursor-pointer text-center hover:text-gray-400'>
                            <span>+</span>
                        </div>
                        <input type="file" className='hidden' multiple accept='image/jpeg, image/png, image/jpg'
                               onChange={handleFileEvent} disabled={fileLimit}/>
                    </label>
                </div>
            </form>

            <div>
                {uploadedFiles.length > 0 && uploadedList}
            </div>
        </PageContent>
    );
}

export default Upload;
