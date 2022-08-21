import React, {useEffect, useState} from 'react';
import PageContent from "@/Components/UI/PageContent";
import {useForm} from "@inertiajs/inertia-react";

const MAX_UPLOADS = 5;

const Upload = props => {
    const [fileLimit, setFileLimit] = useState(false)

    const { data, setData, post} = useForm({
        files: [],
    })

    useEffect(()=>{
        post('/upload')
        console.log('file upload')
    }, [data.files])

    const handleUploadFiles = files => {
        const uploaded = [...data.files];
        let limitExceeded = false;
        files.some(file => {
            console.log(file)
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

    return (
        <PageContent auth={props.auth} errors={props.errors} title="Upload titles">
            <form>
                <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
                    <label>
                        <div
                            className='text-3xl text-gray-300 border px-20 py-10 border-dashed rounded-xl cursor-pointer text-center hover:text-gray-400'>
                            <span>+</span>
                        </div>
                        <input type="file" className='hidden' multiple accept='image/jpeg, image/png, image/jpg'
                               onChange={handleFileEvent} disabled={fileLimit}/>
                    </label>
                </div>
            </form>

            <div>
                {data && data.files.map(file => <div>{file.name}</div>)}
            </div>
        </PageContent>
    );
}

export default Upload;
