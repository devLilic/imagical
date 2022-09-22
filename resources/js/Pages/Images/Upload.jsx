import React from 'react';
import PageContent from "@/Components/UI/PageContent";
import UploadImagesForm from "@/Shared/ImagesUpload/UploadImagesForm";
import FilesProvider from "@/Store/UploadFiles/FilesProvider";
import UploadedFilesList from "@/Shared/ImagesUpload/UploadedFilesList";


const Upload = (props) => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="Incarca imagini">
            <FilesProvider>
                <UploadImagesForm/>

                <div>
                    <UploadedFilesList/>
                </div>
            </FilesProvider>
        </PageContent>
    );
}

export default Upload;
