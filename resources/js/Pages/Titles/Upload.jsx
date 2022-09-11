import React, {useEffect, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import UploadButton from "@/Components/UI/UploadButton/UploadButton";
import PageContent from "@/Components/UI/PageContent";

const Upload = props => {
    const [isFileTypeOK, setIsFileTypeOK] = useState(false);
    const {data, setData, post} = useForm({
        file: {},
    });

    useEffect(() => {
        if (isFileTypeOK) {
            post('titles', data);
        }
    }, [isFileTypeOK])

    function handleChange(e) {
        // check if uploaded file is of type HTML
        const typeOK = e.target.files[0].type === 'text/html'
        setData("file", e.target.files[0]);
        setIsFileTypeOK(typeOK)
    }

    return (
        <PageContent auth={props.auth} errors={props.errors} title="Upload titles">
            <form>
                <div className="flex flex-col w-full h-48 items-center justify-center bg-grey-lighter">
                    <UploadButton title="Încarcă titluri"
                                  handleChange={handleChange}
                                  classes='text-blue-600 bg-white border-blue-600 '/>
                    <div>
                        {!isFileTypeOK && <div className='mt-5'>Fișierul încărcat trebuie să fie de tip HTML</div>}
                    </div>
                </div>
            </form>
        </PageContent>
    );
}

export default Upload;
