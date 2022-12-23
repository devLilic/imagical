import React from 'react';
import PageContent from "@/Components/UI/PageContent";
import AllImagesContent from "@/Pages/Images/AllImagesContent";
import FilesProvider from "@/Store/UploadFiles/FilesProvider";

const AllImages = (props) => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="Toate Imaginile">
            <FilesProvider>
                <AllImagesContent />
            </FilesProvider>
        </PageContent>
    );
};

export default AllImages;
