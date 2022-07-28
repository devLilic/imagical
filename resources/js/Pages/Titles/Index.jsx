import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head, useForm} from '@inertiajs/inertia-react';
import Article from "@/Components/Articles/Article";

export default function Index(props) {
    const [ready, setReady] = useState(false);
    const {data, setData, post, errors} = useForm({
        file: {},
    });

    useEffect(() => {
        if (ready) {
            if (data.file.type !== 'text/html') {
                errors.file = "Only HTML files accepted"
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

    const fileInput = () => (
        <label
            className="mb-5 w-64 text-blue-600 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer border-blue-200 hover:bg-blue-50 hover:text-blue-500">
            <svg className="w-8 h-8"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20">
                <path
                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
            </svg>
            <span className="mt-2 text-base leading-normal">Upload Titles</span>
            <input type="file" className="hidden" onChange={handleChange}/>
        </label>
    )

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Upload titles"/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 relative">
                        <form>
                            <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
                                {fileInput()}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
