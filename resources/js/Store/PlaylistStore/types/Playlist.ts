export interface IPlaylist {
    id: number,
    title: string,
    play_date: string
    selected: boolean
}

export interface IPlaylistApiResponse{
    id: number,
    title: string,
    play_date: string
}

export interface IDefaultPlaylistState {
    playlists: IPlaylist[] | null
}

export interface IPlaylistContext extends IDefaultPlaylistState {
    getLatest: () => Promise<void>
    openPlaylist: (id: number) => Promise<void>
    deletePlaylist: (id: number) => Promise<void>
}
