import React, {useContext} from 'react';
import PlaylistContext from "@/Store/PlaylistStore/playlist-context";
import PlaylistItem from "@/Components/Playlist/PlaylistItem";

const PlaylistsList = () => {
    const playlistCtx = useContext(PlaylistContext);

    return (
        <ul className='list-none mx-2 text-blue-600 w-8/12 mx-auto'>
            {playlistCtx.playlists &&
                playlistCtx.playlists.map(playlist =>
                    <PlaylistItem playlist={playlist} key={playlist.id}/>
                )}
            {!playlistCtx.playlists && <li>NO Playlists</li>}
        </ul>
    );
};

export default PlaylistsList;
