import React, {useContext, useState} from 'react';
import {Button, Dialog as DialogMaterial, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react"
import ArticlesContext from "@/Store/ArticleStore/articles-context";

const Dialog = ({
                    open,
                    size,
                    handleDialog,
                    title,
                    children,
                    closeBtn = false,
                    confirmBtn = false,
                    cancelBtn = false
                }) => {
    return (
        <>
            <DialogMaterial
                open={open}
                size={size || "md"}
                handler={handleDialog}
            >
                <DialogHeader>{title}</DialogHeader>
                <DialogBody divider>
                    {children}
                </DialogBody>
                <DialogFooter>
                    {closeBtn && <Button
                        variant="text"
                        color="red"
                        onClick={handleDialog}
                        className="mr-1"
                    >
                        <span>Close</span>
                    </Button>}
                    {cancelBtn && <Button
                        variant="text"
                        color="red"
                        onClick={handleDialog}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>}
                    {confirmBtn && <Button
                        variant="gradient"
                        color="green"
                        onClick={handleDialog}
                    >
                        <span>Confirm</span>
                    </Button>}
                </DialogFooter>
            </DialogMaterial>
        </>
    );
};

export default Dialog;
