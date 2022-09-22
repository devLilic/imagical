import React from 'react';
import PageContent from "@/Components/UI/PageContent";

const Settings = (props) => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="Setari profil">
            SEttings
        </PageContent>
    );
}

export default Settings;
