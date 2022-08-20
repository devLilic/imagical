import React from 'react';

const Card = (props) => {
    return (
        <div className="my-3 rounded-sm rounded">
            <div className="border border-blue-300 rounded-sm">
                {props.children}
            </div>
        </div>
    );
}

export default Card;
