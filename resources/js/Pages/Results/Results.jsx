import React, {useState} from 'react';
import ArticleWithImages from "@/Components/Articles/ArticleWithImages";
import ModalWithCrop from "@/Components/Images/Edit/ModalWithCrop";
import PageContent from "@/Components/UI/PageContent";

const Results = props => {
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

    const displayArticles = articles.map(article => (
        <ArticleWithImages key={article.id}
                           article={article}
                           editImage={handleEditImage}
        />
    ));

    return (
        <>
            <PageContent auth={props.auth} errors={props.errors} title='Results'>
                <form className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {articles && displayArticles}
                </form>
            </PageContent>

            <ModalWithCrop isVisible={showModal}
                           title={imageToEdit.title}
                           image={imageToEdit.link}
                           hideModal={hideModal}
            />
        </>
    );
}

export default Results;
