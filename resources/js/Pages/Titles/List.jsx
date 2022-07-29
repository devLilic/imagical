import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head, useForm} from '@inertiajs/inertia-react';
import Article from "@/Components/Articles/Article";
import Button from "@/Components/Button";

export default function List(props) {
    const [articles, setArticles] = useState(props.articles)
    const [updateQueries, setUpdateQueries] = useState(true)
    const {data, setData, post, errors} = useForm({
        articles: []
    });
    const [queries, setQueries] = useState([])

    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        if (updateQueries){
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
                if(search_by === 'other' && article.other_title === ''){
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
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="List of titles"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="overflow-hidden shadow-sm sm:rounded-lg">
                        {articles && (
                            articles.map(article => (
                                <Article key={article.search_slug}
                                         article={article}
                                         changeSearchOption={onChangeSearchOption}
                                         onChangeOtherInputValue={handleOtherInputValue}
                                />
                            ))
                        )}
                    </form>
                    <button disabled={props.articles.length === 0}
                            onClick={searchImages}
                            className="border px-7 py-2 rounded-lg bg-blue-500 text-white disabled:bg-blue-200">Search
                    </button>
                </div>


            </div>

        </Authenticated>
    );
}
