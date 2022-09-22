import React, {useContext} from 'react';
import ImagesProvider from "@/Store/LocalImagesStore/ImagesProvider";
import ImagesContext from "@/Store/LocalImagesStore/images-context";

const Images = () => {
    const imagesCtx = useContext(ImagesContext)
    return (
        <div>

        </div>
    );
};

export default Images;
