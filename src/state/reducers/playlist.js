import _ from "lodash";
import { CURR_SONG_FINISHED, FETCH_PLAYLIST, UPDATE_PLAYLIST } from "../actions/playlist";

const orderPlaylist = playlist => _.orderBy(playlist, ['priority', 'inserted_index'], ['desc', 'asc']);

const playlistReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PLAYLIST:
            return orderPlaylist(action.payload);
        case UPDATE_PLAYLIST:
            const firstSong = _.get(action, 'payload[0]');
            const playlist = orderPlaylist(action.payload.slice(1));
            return orderPlaylist([firstSong, ...playlist]);
        case CURR_SONG_FINISHED:
            const playlistWithoutFirst = state.slice(1);
            return playlistWithoutFirst.map((song, idx) => idx === 0 ? { ...song, priority: 100000 } : song);
        default:
            return state;
    }
}

export default playlistReducer;

