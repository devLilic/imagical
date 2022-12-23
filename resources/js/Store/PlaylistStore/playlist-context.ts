import React from "react";
import {IPlaylistContext} from "@/Store/PlaylistStore/types/Playlist";

const PlaylistContext = React.createContext<IPlaylistContext>({
    playlists: null,
    getLatest: async () => {},
    openPlaylist: async (id) => {},
    deletePlaylist: async (id) => {},
})

export default PlaylistContext;
