export type ArticleType = {
    id: string | null
    title: string,
    slug: string,
    custom: string,
    content: string,
    type: 'BETA' | 'OFF'
    search_by: 'slug' | 'title' | 'custom',
    showIntro: boolean,
    images: {
        wallpaper: string,
    }
}

