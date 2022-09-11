import React from 'react';
import Input from "../elements/Input";
import ImagePreview from "./ImagePreview";

export default function ImageBlock(props) {
    const {image, setUrl, setTitle, edit, deleteImg} = props;
    return (
        <li className="flex relative">
            {/*img-inputs*/}
            <div className='flex w-full border bg-indigo-100 rounded-lg p-2 mb-2 h-130'>
                <div className="w-7/12 flex flex-col justify-around">
                    <Input placeholder="Image url"
                           action={value => (setUrl(value, image.id))}
                           value={image.url}/>

                    <Input placeholder="Image name"
                           action={value => (setTitle(value, image.id))}
                           value={image.title}/>
                </div>
                {/*img-preview*/}
                <ImagePreview image={image} edit={edit}/>
            </div>
            <button type='button'
                    onClick={() => deleteImg(image.id)}
                    className='text-center px-1 bg-red-300 hover:bg-red-500 text-white text-xs absolute top-0 right-0 rounded-tr-lg'
            >&times;
            </button>

        </li>
    );
}


