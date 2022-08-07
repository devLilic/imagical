import React from 'react';

function Card(props) {
    return (
        <div className="mx-2 my-3 bg-blue-100 rounded-sm">
            <div className="w-full flex border border-blue-300 rounded-sm">
                {props.children}
            </div>
        </div>
    );
}

export default Card;
