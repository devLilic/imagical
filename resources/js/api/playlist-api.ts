import {IPlaylist, IPlaylistApiResponse} from "@/Store/PlaylistStore/types/Playlist";
import axios from "axios";

interface PlaylistApiType {
    getPlaylists: () => Promise<IPlaylistApiResponse[]>
    getPlaylist: (id: number) => Promise<IPlaylist>
    deletePlaylist: (id: number) => Promise<void>
}

const playlistInstance = axios.create({
    baseURL: "api/playlists/"
})

export const PlaylistApi: PlaylistApiType = {

    getPlaylists: () => playlistInstance.get<IPlaylistApiResponse[]>(`/`)
        .then(response => response.data),

    getPlaylist: (id) => playlistInstance.get(`${id}`)
        .then(response => response.data),

    deletePlaylist: (id) => playlistInstance.delete(`${id}`)
        .then(response => response.data)
}
