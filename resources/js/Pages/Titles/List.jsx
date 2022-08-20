import React, {useContext, useEffect, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import Article from "@/Components/Articles/Article";
import PageContent from "@/Components/UI/PageContent";
import ArticlesProvider from "@/Store/ArticleStore/ArticlesProvider";
import ArticlesContext from "@/Store/ArticleStore/articles-context";
import ArticlesList from "@/Components/Articles/ArticlesList";


const List = props => {
    const articlesCtx = useContext(ArticlesContext)

    const [articles, setArticles] = useState(props.articles)
    const [updateQueries, setUpdateQueries] = useState(true)
    const {data, setData, post, errors} = useForm({
        articles: []
    });
    const [queries, setQueries] = useState([])

    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        if (updateQueries) {
            const options = {slug: "search_slug", title: "title", other: "other_title"}

            setData("articles", articles.map((article) => {
                const search_by = article.search_by
                return {
                    id: article.search_slug,
                    query: article[options[search_by]]
                }
            }))
        }
        setUpdateQueries(false);
    }, [updateQueries])

    function onChangeSearchOption(article_id, search_by) {
        setUpdateQueries(true);
        setArticles(() => {
            articles.map((article) => {
                if (article.search_slug === article_id) {
                    article.search_by = search_by;
                }
                if (search_by === 'other' && article.other_title === '') {
                    setSubmitDisabled(true)
                }
            });
            return articles;
        })

    }

    function handleOtherInputValue(article_id, value) {
        setUpdateQueries(true);
        setArticles(() => {
            articles.map((article) => {
                if (article.search_slug === article_id) {
                    article.other_title = value;
                }
            });
            return articles;
        })
    }

    function searchImages() {
        post('search');
    }

    return (
        <PageContent auth={props.auth} errors={props.errors} title="List of titles">
            <ArticlesProvider articles={props.articles}>
                <ArticlesList onChangeSearchOption={onChangeSearchOption}
                              handleOtherInputValue={handleOtherInputValue}/>
                <button disabled={props.articles.length === 0}
                        onClick={searchImages}
                        className="border px-7 py-2 rounded-lg bg-blue-500 text-white disabled:bg-blue-200">Search
                </button>
            </ArticlesProvider>
        </PageContent>
    );
}

export default List;
