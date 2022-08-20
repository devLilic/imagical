import React from "react";
import UploadSvg from "@/Components/UI/UploadButton/UploadSvg";

const UploadButton = ({classes, title, handleChange}) => {
    const labelClasses = "text-blue-600 flex items-center px-4 py-2 " +
        "bg-white text-blue rounded-lg tracking-wide uppercase " +
        "border border-blue cursor-pointer border-blue-300 hover:bg-blue-50 hover:text-blue-500 " +
        classes;

    return (
        <label
            className={labelClasses}>
            <UploadSvg />
            <span className="ml-2">{title}</span>
            <input type="file" className="hidden" onChange={handleChange}/>
        </label>
    )
}

export default UploadButton;
