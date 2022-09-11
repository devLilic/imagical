import React from 'react';
import {Checkbox as MaterialCheckbox} from "@material-tailwind/react";

const Checkbox = ({id, isChecked, value, onChange}) => {
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
