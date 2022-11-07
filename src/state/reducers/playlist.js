import _ from "lodash";
import { CURR_SONG_STARTED, DISLIKE_SONG, FETCH_PLAYLIST, LIKE_SONG, UPDATE_PLAYLIST } from "../actions/playlist";

const orderPlaylist = playlist => _.orderBy(playlist, ['priority', 'inserted_index'], ['desc', 'asc']);

const playlistReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PLAYLIST:
            console.log({ playlist: action.payload });
            return orderPlaylist(action.payload);
        // case UPDATE_PLAYLIST:
        //     const firstSong = _.get(action, 'payload[0]');
        //     const playlist = orderPlaylist(action.payload.slice(1));
        //     return orderPlaylist([firstSong, ...playlist]);
        case CURR_SONG_STARTED:
            const playlistWithoutFirst = state.slice(1);
            return orderPlaylist(playlistWithoutFirst.map((song, idx) => idx === 0 ? { ...song, priority: 100000 } : song));
        case LIKE_SONG:
            console.log('like-song-reducer', { song: action.payload })
            return orderPlaylist(state.map(song => song.uri === action.payload.uri
                ? { ...song, priority: song.priority + 1 }
                : song
            ));
        case DISLIKE_SONG:
            console.log('dislike-song-reducer', { song: action.payload })
            return orderPlaylist(state.map(song => song.uri === action.payload.uri
                ? { ...song, priority: song.priority - 1 }
                : song
            ));
        default:
            return orderPlaylist(state);
    }
}

export default playlistReducer;

