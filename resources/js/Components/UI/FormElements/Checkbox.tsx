import React, {FC} from 'react';
import {Checkbox as MaterialCheckbox} from "@material-tailwind/react";

type PropsType = {
    id: string,
    isChecked: boolean,
    value: string,
    onChange: () => void
}

const Checkbox: FC<PropsType> = ({id, isChecked, value, onChange}) => {
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
