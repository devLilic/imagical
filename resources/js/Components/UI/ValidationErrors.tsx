import React, {FC} from 'react';

type PropsType = {
    errors: [],
}

const ValidationErrors: FC<PropsType> = ({ errors }) => (
    Object.keys(errors).length > 0 && (
        <div className="mb-4">

            <ul className="mt-3 list-none list-inside text-sm text-red-600">
                {Object.keys(errors).map(function (key, index) {
                    return <li key={index}>{errors[key]}</li>;
                })}
            </ul>
        </div>
    )
);

export default ValidationErrors;
