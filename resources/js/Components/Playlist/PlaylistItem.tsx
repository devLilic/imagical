import React, {useContext} from 'react';
import Button from "@/Components/UI/FormElements/Button";
import PlaylistContext from "@/Store/PlaylistStore/playlist-context";
import {IPlaylist} from '@/Store/PlaylistStore/types/Playlist';
import DeleteIcon from "@/Components/UI/Svg/DeleteIcon";

interface PlaylistItemProps {
    playlist: IPlaylist
}

const PlaylistItem = ({playlist}: PlaylistItemProps) => {

    const playlistCtx = useContext(PlaylistContext)

    return (
        <li className='hover:text-blue-800 cursor-pointer px-3 py-1 bg-blue-50 rounded-lg flex justify-between items-center'
            key={playlist.id}>
            <span>{playlist.title} {(playlist.play_date)}</span>
            <div className='flex items-center'>
                <a className='border border-blue-600 px-2 py-1 rounded hover:bg-blue-400 hover:text-white'
                   href={route('playlist', playlist.id)}>Open</a>
                <Button processing={false}
                        className='bg-red-300 border-red-300 hover:bg-red-400 ml-2'
                        onClick={() => playlistCtx.deletePlaylist(playlist.id)}><DeleteIcon/></Button>
            </div>
        </li>
    );
};

export default PlaylistItem;
