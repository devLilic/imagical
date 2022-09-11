import React, {useContext, useEffect} from 'react';
import PageContent from "@/Components/UI/PageContent";
import ImagesContext from "@/Store/LocalImagesStore/images-context";
import ImagesProvider from "@/Store/LocalImagesStore/ImagesProvider";

const AllImages = (props) => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="Toate Imaginile">
            <ImagesProvider>

            </ImagesProvider>
        </PageContent>
    );
};

export default AllImages;
