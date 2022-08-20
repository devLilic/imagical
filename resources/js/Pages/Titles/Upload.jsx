import React, {useEffect, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import UploadButton from "@/Components/UI/UploadButton/UploadButton";
import DisplayError from "@/Components/UI/DisplayError";
import PageContent from "@/Components/UI/PageContent";

const Upload = props => {
    const [error, setError] = useState('')
    const [ready, setReady] = useState(false);
    const {data, setData, post} = useForm({
        file: {},
    });

    useEffect(() => {
        if (ready) {
            if (data.file.type !== 'text/html') {
                setError("Only HTML files accepted")
            } else {
                post('titles', data);
            }
            setReady(false);
        }
    }, [data.file])

    function handleChange(e) {
        setData("file", e.target.files[0]);
        setReady(true);
    }

    return (
        <PageContent auth={props.auth} errors={props.errors} title="Upload titles">
            {error && <DisplayError error={error}/>}
            <form>
                <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
                    <UploadButton title="Upload Titles" handleChange={handleChange} classes='text-lg hover:text-red-600'/>
                </div>
            </form>
        </PageContent>
    );
}

export default Upload;
