import React, {useContext} from 'react';
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import LocalImages from "@/Components/LocalImages/LocalImages";

const AllImagesContent = () => {
    const imagesCtx = useContext(ImagesContext)
    return (
        <LocalImages title='Imagini'
                     loading={imagesCtx.local.loading}
                     images={imagesCtx.local.images}
                     cols={6}
        />
    );
};

export default AllImagesContent;
