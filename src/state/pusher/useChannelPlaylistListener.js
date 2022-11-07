import { useDispatch } from "react-redux";
import { recieveNewMessage } from "../actions/chat";
import { updatePlaylist } from "../actions/playlist";
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
        playlistChannel.bind(playlistEvents.UPDATE_PLAYLIST, playlist => {
            console.log('update-playlist-listener', { playlist });
            updatePlaylist(playlist)(dispatch);
        });
    }
}

export default useChannelPlaylistListener;