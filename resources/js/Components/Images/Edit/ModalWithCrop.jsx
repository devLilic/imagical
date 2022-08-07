import React from 'react';
import Modal from "@/Components/UI/Modal/Modal";


function ModalWithCrop({title, isVisible, image, hideModal}) {
    return (
        <Modal title={title} isVisible={isVisible} image={image} hideModal={hideModal}>
            <img src={image} />
            {/*<CropBlock image={props.image} crop={props.crop}/>*/}
        </Modal>
    );
}

export default ModalWithCrop;
