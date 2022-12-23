import React, {FC, PropsWithChildren} from 'react';

type PropsType = {
    type?: 'submit' | 'button' | 'reset',
    className: string,
    processing: boolean,
    clickHandler: () => void
}

const Button: FC<PropsWithChildren<PropsType>> = ({type = 'submit', className = '', processing, clickHandler, children}) => {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150
                ${processing && 'opacity-25'} ` + className
            }
            disabled={processing}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

export default Button;
