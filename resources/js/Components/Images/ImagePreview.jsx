import React, {useRef, useState} from 'react';

export default function ImagePreview({image, edit}) {
    const [imageParams, setImageParams] = useState({
        aspect: false,
        format: false,
        size: false,
    })
    const imgRef = useRef()

    const urlPattern = /^(http(s)?:\/\/.)?.+\.(jpg|jpeg|png|webp).*/i;

    // filters to check on every image
    const filters = {
        aspect: '16:9',
        format: /^(http(s)?:\/\/.)?.+\.(jpg|jpeg|png|webp).*/i,
        size: {
            w: 500,
            h: 400
        }
    }

    function spanStyle(condition) {
        return "px-1 py-1 rounded ml-1 " + (condition ? 'bg-green-500' : 'bg-red-500')
    }

    function applyFilters(event) {
        const img = event.target;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let res = gcd(w, h);

        // change Image badges according to filters
        const newFilterList = {
            aspect: (`${w / res}:${h / res}` === filters.aspect),
            format: filters.format.test(img.src),
            size: img.naturalWidth >= filters.size.w && img.naturalHeight >= filters.size.h
        }
        setImageParams(newFilterList)

        // find the Greatest Common Divider for both numbers
        function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
        }
    }

    const imgClipPath = image.cropped ?
        {
            clipPath: `polygon(${image.section.x}% ${image.section.y}%,
            ${image.section.width + image.section.x}% ${image.section.y}%,
            ${image.section.width + image.section.x}% ${image.section.height + image.section.y}%,
            ${image.section.x}% ${image.section.height + image.section.y}%)`
        }
        :
        {}

    function drawPreviewBlock() {

        return image.url.trim() !== '' &&
        (urlPattern.test(image.url)) ?
            (<>
                <div className="text-xs text-white flex flex-col items-center mr-3 justify-around mt-2">
                            <span className={spanStyle(imageParams.aspect || image.cropped)}
                                  title="Aspect ratio">16:9</span>
                    <span className={spanStyle(imageParams.format)}
                          title="Accepted formats: JPG, JPEG or PNG">IMG</span>
                    <span className={spanStyle(imageParams.size)}
                          title={`Minimal image size: ${filters.size.w}px x ${filters.size.h}px`}>LOW</span>
                </div>
                <div>
                    <div className='h-full'>
                        <img
                            ref={imgRef}
                            src={image.url}
                            className="h-full"
                            alt="preview"
                            onLoad={applyFilters}
                            onClick={edit}
                            title={'title'}
                            style={imgClipPath}
                        />
                    </div>
                </div>
            </>) : (
                <span className="w-full text-center text-lg text-red-700 bg-red-200 px-3 py-2 rounded-lg self-center">Incorrect url</span>)
    }

    return (
        <div className="w-5/12 ml-2 flex">
            {drawPreviewBlock()}
        </div>
    );
}
