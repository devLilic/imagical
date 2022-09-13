import React, {useEffect, useState} from 'react';
import {useForm} from "@inertiajs/inertia-react";

const MAX_UPLOADS = 20;

const UploadForm = (props) => {
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
    return (
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
    );
};

export default UploadForm;
