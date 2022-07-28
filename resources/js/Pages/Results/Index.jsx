import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head} from '@inertiajs/inertia-react';
import ArticleWithImages from "@/Components/Articles/ArticleWithImages";

export default function Index(props) {

    const [articles] = useState(props.articles)

    console.log(props.articles)
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
                                />
                            ))
                        )}
                    </form>
                </div>
            </div>

        </Authenticated>
    );
}
