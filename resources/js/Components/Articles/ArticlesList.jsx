import React, {useContext, useState} from 'react';
import Article from "@/Components/Articles/Article";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import Modal from "@/Components/UI/Modal/Modal";
import LocalImages from "@/Components/LocalImages/LocalImages";
import ImagesProvider from "@/Store/LocalImagesStore/ImagesProvider";

const ArticlesList = props => {
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Select Image')
    const articlesCtx = useContext(ArticlesContext)

    const modalHandler = (article_title = null) => {
        setModalTitle(article_title || "Select Image")
        setShowImagesModal(prevState => !prevState)
    }

    return (
        <ImagesProvider>
            <div className="overflow-hidden shadow-sm sm:rounded-lg grid grid-cols-4 gap-x-5">
                {articlesCtx.articles && (
                    articlesCtx.articles.map(article =>
                        <Article key={article.id}
                                 article={article}
                                 handleModal={modalHandler.bind(null, article.search.value)}
                        />
                    )
                )}
            </div>
            <Modal title={modalTitle}
                   isVisible={showImagesModal}
                   hideModal={modalHandler}>
                <LocalImages handleModal={modalHandler}/>
            </Modal>
        </ImagesProvider>
    );
};

export default ArticlesList;
