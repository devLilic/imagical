import React, {FC, PropsWithChildren} from 'react';

type PropsType = {
    forInput: string,
    value: string,
    className: string,
}

const Label: FC<PropsWithChildren<PropsType>> = ({ forInput, value, className, children }) => {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
export default Label
