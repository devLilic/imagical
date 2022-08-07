import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head} from '@inertiajs/inertia-react';
import ArticleWithImages from "@/Components/Articles/ArticleWithImages";
import ModalWithCrop from "@/Components/Images/Edit/ModalWithCrop";

export default function Results(props) {
    const [showModal, setShowModal] = useState(false)
    const [articles] = useState(props.articles)
    const [imageToEdit, setImageToEdit] = useState({})

    const handleEditImage = (image) => {
        setImageToEdit(image)
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="List of titles"/>
            <div className="py-12 relative">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {articles && (
                            articles.map(article => (
                                <ArticleWithImages key={article.id}
                                                   article={article}
                                                   editImage={handleEditImage}
                                />
                            ))
                        )}
                    </form>
                </div>
            </div>
            <ModalWithCrop isVisible={showModal}
                   title={imageToEdit.title}
                   image={imageToEdit.link}
                   hideModal={hideModal}
            />
        </Authenticated>
    );
}
