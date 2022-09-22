import React, {useContext} from 'react';
import UploadButton from "@/Components/UI/UploadImages/UploadButton";
import FilesContext from "@/Store/UploadFiles/files-context";

const UploadImagesForm = () => {
    const filesCtx = useContext(FilesContext);

    return (
        <form >
            <h2 className='text-xl font-bold uppercase mb-2 text-center'>Adaugă imagini</h2>
            <UploadButton handleUploadFiles={filesCtx.uploadImages} fileLimitExceeded={filesCtx.fileLimitExceeded} loading={filesCtx.loading}/>
        </form>
    );
};

export default UploadImagesForm;
