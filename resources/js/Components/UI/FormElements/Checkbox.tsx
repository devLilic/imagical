import React, {ChangeEventHandler, FC} from 'react';
import {Checkbox as MaterialCheckbox} from "@material-tailwind/react";

interface ICheckbox{
    id: string,
    isChecked: boolean,
    value?: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({id, isChecked, value, onChange}: ICheckbox) => {
    return (
        <MaterialCheckbox color="blue"
                          ripple={false}
                          className='w-4 h-4'
                          id={id}
                          checked={isChecked}
                          value={value}
                          onChange={onChange}
        />
    );
};

export default Checkbox;
