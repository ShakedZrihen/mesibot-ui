import { useDispatch } from "react-redux";
import { recieveNewMessage } from "../actions/chat";
import chatEvents from "./chat.events";

const useChannelPlaylistListener = (playlistChannel) => {
    const dispatch = useDispatch();

    /* chat events */
    playlistChannel.bind(chatEvents.NEW_MESSAGE, message => {
        console.log('event-test-trigger', { message });
        recieveNewMessage(message)(dispatch);
    });
}

export default useChannelPlaylistListener;