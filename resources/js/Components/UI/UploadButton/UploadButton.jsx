import React from "react";
import UploadSvg from "@/Components/UI/UploadButton/UploadSvg";

export default function UploadButton({handleChange}) {
    return (
        <label
            className="mb-5 w-64 text-blue-600 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer border-blue-200 hover:bg-blue-50 hover:text-blue-500">
            <UploadSvg/>
            <span className="mt-2 text-base leading-normal">Upload Titles</span>
            <input type="file" className="hidden" onChange={handleChange}/>
        </label>
    )
}
