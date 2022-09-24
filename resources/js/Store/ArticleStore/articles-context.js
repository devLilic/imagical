import React from "react";

const ArticlesContext = React.createContext({
    articles: [],
    articleToEdit: null,
    showIntro: id => {},
    addWallpaper: img_url => {},
    removeWallpaper: articleID => {},
    setSearchData: (articleID, searchBy, searchValue) => {},
    removeArticle: (articleID) => {},
    addNewArticle: (title, type, prevID) => {}
})

export default ArticlesContext;
