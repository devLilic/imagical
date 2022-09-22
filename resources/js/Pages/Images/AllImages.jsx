import React from 'react';
import PageContent from "@/Components/UI/PageContent";
import ImagesProvider from "@/Store/LocalImagesStore/ImagesProvider";
import AllImagesContent from "@/Components/LocalImages/AllImagesContent";

const AllImages = (props) => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="Toate Imaginile">
            <ImagesProvider>
                <AllImagesContent />
            </ImagesProvider>
        </PageContent>
    );
};

export default AllImages;
