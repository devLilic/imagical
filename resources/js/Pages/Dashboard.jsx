import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head} from '@inertiajs/inertia-react';
import Button from "@/Components/UI/FormElements/Button";
import Input from "@/Components/UI/FormElements/Input";

export default function Dashboard(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setResult] = useState([]);


    function handleInput(e) {
        setSearchQuery(e.target.value)
    }

    function submit(e) {
        fetch('/api/results', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({searchQuery: searchQuery})
        }).then(response => response.json())
            .then(data => {
                console.log(data.items)
                setResult(data.items)
            })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex m-2">
                            <form onSubmit={handleResult}></form>
                            <Input className="text-xs" handleChange={handleInput}/>
                            <Button type='submit'>Find</Button>
                        </div>
                        <div>
                            <div>
                                {images && (<ul className="flex mx-auto items-stretch w-10/12 list-none w-full flex-wrap">
                                    {(images.map((image) =>
                                        <li className="mr-1">
                                            <div>
                                                <img src={image.link} style={{height: '150px'}}/>
                                            </div>
                                            <a href={image.link} target="_blank"><span>{image.displayLink}</span></a>
                                        </li>
                                    ))}
                                </ul>)}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
