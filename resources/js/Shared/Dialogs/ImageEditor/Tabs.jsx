import React from 'react';
import {Tabs as MaterialTabs, Tab, TabPanel, TabsBody, TabsHeader} from "@material-tailwind/react";
import LocalTab from "@/Shared/Dialogs/ImageEditor/LocalTab";
import GoogleTab from "@/Shared/Dialogs/ImageEditor/GoogleTab";

const tabsData = [
    {
        label: "Upload",
        value: 'upload',
        desc: 'Uploaded images'
    }
]
const Tabs = ({selectImage, hideDialog}) => {
    return (
        <MaterialTabs id="custom-animation" value="external" className='min-w-full'>
            <TabsHeader>
                <Tab key="local" value="local">Imagini locale</Tab>
                <Tab key="external" value="external">Google</Tab>
                {tabsData.map(({label, value}) => (
                    <Tab key={value} value={value}>{label}</Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    mount: {y: 0},
                    unmount: {y: 250},
                }}>
                <LocalTab onSelectImage={selectImage}/>
                <GoogleTab onSelectImage={selectImage} hideDialog={hideDialog} />
                {tabsData.map(({value, desc}) => (
                    <TabPanel key={value} value={value} className='w-full'>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </MaterialTabs>
    );
};

export default Tabs;
