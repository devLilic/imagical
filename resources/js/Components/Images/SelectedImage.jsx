import React from 'react';

export default function SelectedImage({image}) {
    return (
        <div className="w-4/12 ml-2 pt-8">
            {image.link && (<div>
                <img className="w-full" src={image.link} alt=""/>
                <div className="mt-2">
                    <p><span className='font-bold'>{image.displayLink}</span> ({image.width} x {image.height})</p>
                    <p><a className="underline text-blue-800 hover:text-red-400 text-sm" target="_blank" href={image.contextLink}>
                        Vezi articol >>>
                    </a></p>
                </div>
            </div>)}
        </div>
    )
}
