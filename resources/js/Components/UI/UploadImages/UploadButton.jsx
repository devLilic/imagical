import React from 'react';
import Loading from "@/Components/UI/Svg/Loading";

const UploadButton = ({handleUploadFiles, fileLimitExceeded, loading}) => {
    const accepted_file_types = 'image/jpeg, image/png, image/jpg';

    return (
        <div className="flex w-full h-48 items-center justify-center bg-grey-lighter">
            <label>
                <div
                    className='text-3xl text-gray-300 border px-20 py-10 border-dashed border-gray-400 rounded-xl cursor-pointer text-center hover:text-gray-400'>
                    {!loading && <span>+</span>}
                    {loading && <Loading color='red'/>}
                </div>
                <input type="file" className='hidden' multiple accept={accepted_file_types}
                       onChange={handleUploadFiles} disabled={fileLimitExceeded}/>
            </label>
        </div>
    );
};

export default UploadButton;
