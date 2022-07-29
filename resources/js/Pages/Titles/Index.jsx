import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head, useForm} from '@inertiajs/inertia-react';
import UploadButton from "@/Components/UploadButton";
import DisplayError from "@/Components/DisplayError";

export default function Index({auth, errors}) {
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
        <Authenticated
            auth={auth}
            errors={errors}
        >
            <Head title="Upload titles"/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 relative">
                        {error && <DisplayError error={error} />}
                        <form>
                            <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
                                <UploadButton handleChange={handleChange}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
