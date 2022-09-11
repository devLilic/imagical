import React from 'react';
import PageContent from "@/Components/UI/PageContent";
import ArticlesProvider from "@/Store/ArticleStore/ArticlesProvider";
import ArticlesList from "@/Shared/Articles/ArticlesList";
import ImagesProvider from "@/Store/LocalImagesStore/ImagesProvider";


const List = props => {
    return (
        <PageContent auth={props.auth} errors={props.errors} title="List of titles">
            <ArticlesProvider articles={props.articles}>
                <ImagesProvider>
                    <ArticlesList/>
                </ImagesProvider>
            </ArticlesProvider>
        </PageContent>
    );
}

export default List;
