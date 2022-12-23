import React, {FC, PropsWithChildren} from 'react';
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

export type UserType = {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
}

type PropsType = {
    title: string,
    auth: { user: UserType },
}

const PageContent: FC<PropsWithChildren<PropsType>> = ({title, auth,  children}) => {
    return (
        <Authenticated
            auth={auth}
            header={[]}
        >
            <Head title={title}/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 relative">
                        {children}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default PageContent;
