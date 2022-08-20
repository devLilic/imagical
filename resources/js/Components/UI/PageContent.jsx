import React from 'react';
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

const PageContent = props => {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title={props.title}/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 relative">
                        {props.children}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default PageContent;
