import React, {FC, PropsWithChildren} from 'react';
import {Button, Dialog as DialogMaterial, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react"


type PropsType = {
    open: boolean
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
    handleDialog: () => void
    title: string
    closeBtn?: boolean
    confirmBtn?: boolean
    cancelBtn?: boolean
    confirmText?: string
    confirmAction?: () => void
}

const Dialog: FC<PropsWithChildren<PropsType>> = ({
                                                      open,
                                                      size = "md",
                                                      handleDialog,
                                                      title,
                                                      children,
                                                      closeBtn = false,
                                                      confirmBtn = false,
                                                      cancelBtn = false,
                                                      confirmText = '',
                                                      confirmAction
                                                  }) => {
    return (
        <>
            <DialogMaterial open={open} size={size} handler={handleDialog}>
                <DialogHeader>{title}</DialogHeader>
                <DialogBody divider>
                    {children}
                </DialogBody>
                <DialogFooter>
                    {closeBtn &&
                        <Button variant="text" color="red" onClick={handleDialog} className="mr-1">
                            <span>Close</span>
                        </Button>}
                    {cancelBtn &&
                        <Button variant="text" color="red" onClick={handleDialog} className="mr-1">
                            <span>Cancel</span>
                        </Button>}
                    {confirmBtn &&
                        <Button variant="gradient" color="green" onClick={confirmAction}>
                            <span>{confirmText ? confirmText : 'Confirm'}</span>
                        </Button>}
                </DialogFooter>
            </DialogMaterial>
        </>
    );
};

export default Dialog;
