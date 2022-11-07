import { useDispatch } from "react-redux";
import { recieveNewMessage } from "../actions/chat";
import { dislikeSong, likeSong, newSong, updatePlaylist } from "../actions/playlist";
import chatEvents from "./chat.events";
import playlistEvents from "./playlist.events";


const useChannelPlaylistListener = ({ pusher, playlistId }) => {
    const dispatch = useDispatch();

    if (playlistId) {
        const playlistChannel = pusher.subscribe(playlistId);

        /* chat events */
        playlistChannel.bind(chatEvents.NEW_MESSAGE, message => {
            recieveNewMessage(message)(dispatch);
        });

        /*playlist events*/
        // playlistChannel.bind(playlistEvents.UPDATE_PLAYLIST, playlist => {
        //     console.log('update-playlist-listener', { playlist });
        //     updatePlaylist(playlist)(dispatch);
        // });

        playlistChannel.bind(playlistEvents.LIKE_SONG, song => {
            likeSong(song)(dispatch);
        });

        playlistChannel.bind(playlistEvents.DISLIKE_SONG, song => {
            dislikeSong(song)(dispatch);
        });

        playlistChannel.bind(playlistEvents.NEW_SONG, song => {
            newSong(song)(dispatch);
        });
    }
}

export default useChannelPlaylistListener;