import React, {FC, PropsWithChildren} from 'react';

const Card: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="my-3 rounded-sm rounded">
            <div className="border border-blue-300 rounded-sm">
                {children}
            </div>
        </div>
    );
}

export default Card;
