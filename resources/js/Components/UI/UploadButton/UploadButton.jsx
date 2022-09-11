import React from "react";
import UploadSvg from "@/Components/UI/UploadButton/UploadSvg";

const UploadButton = ({classes, title, handleChange}) => {
    const labelClasses = "flex items-center px-4 py-2 bg-white rounded-lg tracking-wide uppercase border border-blue cursor-pointer shadow-xl hover:shadow-lg "+classes;
    return (
        <label className={labelClasses}>
            <UploadSvg/>
            <span className='ml-2'>{title}</span>
            <input type="file" className="hidden" onChange={handleChange}/>
        </label>
    )
}

export default UploadButton;
