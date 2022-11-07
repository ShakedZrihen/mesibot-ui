import _ from "lodash";
import { UPDATE_PLAYLIST } from "../actions/playlist";

const playlistReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_PLAYLIST:
            const firstSong = _.get(action, 'payload[0]');
            const playlist = _.orderBy(action.payload.slice(1), ['priority', 'inserted_index'], ['desc', 'asc']);
            return _.orderBy([firstSong, ...playlist], ['priority', 'inserted_index'], ['desc', 'asc']);
        default:
            return state;
    }
}

export default playlistReducer;

