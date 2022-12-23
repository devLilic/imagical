import React, {useContext} from 'react';
import LocalImages from "@/Components/LocalImages/LocalImages";
import FilesContext from '@/Store/UploadFiles/files-context';
import UploadedFilesList from '@/Shared/ImagesUpload/UploadedFilesList';

const AllImagesContent = () => {
    const filesCtx = useContext(FilesContext)
    return (
        <UploadedFilesList />
    );
};

export default AllImagesContent;
