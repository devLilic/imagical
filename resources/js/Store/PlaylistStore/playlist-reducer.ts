import {PlaylistActionsType} from "@/Store/PlaylistStore/types/PlaylistActions";
import {IDefaultPlaylistState} from "@/Store/PlaylistStore/types/Playlist";
import {DELETE_PLAYLIST, GET_LATEST_PLAYLISTS} from "@/Store/PlaylistStore/playlist-actions";

export const defaultPlaylistState: IDefaultPlaylistState = {
    playlists: []
}

export const playlistReducer = (state: IDefaultPlaylistState, action: PlaylistActionsType): IDefaultPlaylistState => {
    switch (action.type) {
        case GET_LATEST_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlists
            }
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.filter(playlist => playlist.id !== action.playlist_id)
            }

        default:
            return state
    }
}
