import React from "react";

const ArticlesContext = React.createContext({
    articles: [],
    articleToEdit: null,
    showIntro: id => {},
    addWallpaper: img_url => {},
    removeWallpaper: articleID => {},
    setSearchData: (articleID, searchBy, searchValue) => {},
    removeArticle: (articleID) => {},
})

export default ArticlesContext;
