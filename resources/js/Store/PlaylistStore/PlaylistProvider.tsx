import React, {useEffect, useReducer} from 'react';
import {defaultPlaylistState, playlistReducer} from "@/Store/PlaylistStore/playlist-reducer";
import {IPlaylistContext} from "@/Store/PlaylistStore/types/Playlist";
import {PlaylistApi} from "@/api/playlist-api";
import {DELETE_PLAYLIST, GET_LATEST_PLAYLISTS, OPEN_PLAYLIST} from "@/Store/PlaylistStore/playlist-actions";
import PlaylistContext from './playlist-context';

const PlaylistProvider = props => {

    const [playlistState, dispatchPlaylistAction] = useReducer(playlistReducer, defaultPlaylistState)

    useEffect(() => {
        getLatest();
    }, []);

    const getLatest = async () => {
        const playlists = await PlaylistApi.getPlaylists()
        return dispatchPlaylistAction({type: GET_LATEST_PLAYLISTS, playlists})
    }

    const openPlaylist = async (id: number) => {
        const playlist = await PlaylistApi.getPlaylist(id);
        return dispatchPlaylistAction({type: OPEN_PLAYLIST, playlist})
    }

    const deletePlaylist = async (id: number) => {
        await PlaylistApi.deletePlaylist(id);
        return dispatchPlaylistAction({type: DELETE_PLAYLIST, playlist_id: id})
    }

    const playlistContext: IPlaylistContext = {
        playlists: playlistState.playlists,
        getLatest,
        openPlaylist,
        deletePlaylist,
    }

    return (<PlaylistContext.Provider value={playlistContext}>
        {props.children}
    </PlaylistContext.Provider>)
}

export default PlaylistProvider;
