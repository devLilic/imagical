import {IArticlesContext} from "./types/Article";
import React from "react";

const ArticlesContext = React.createContext<IArticlesContext>({
    articles: [],
    articleToEdit: null,
    showIntro: article_id => {},
    setArticleToEdit: article_id => {},
    addWallpaper: image_url => {},
    removeWallpaper: articleID => {},
    editSearch: (article_id, search_type) => {},
    addCustomTitle: (article_id, custom_title) => {},
    addNewArticle: (title, type, prevID) => {}
})

export default ArticlesContext;
