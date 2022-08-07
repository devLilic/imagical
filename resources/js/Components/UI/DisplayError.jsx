import React from 'react';

export default function DisplayError({ error }) {
    return (
        error && <p className="text-sm text-red-600 bg-red-200 inline-block px-3 py-3 rounded-lg rounded-tl-none rounded-br-none absolute top-0 right-0">{error}</p>
    );
}
