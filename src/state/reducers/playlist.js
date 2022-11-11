import _ from 'lodash';
import {
  CURR_SONG_STARTED,
  DISLIKE_SONG,
  FETCH_PLAYLIST,
  LIKE_SONG,
  NEW_SONG
} from '../actions/playlist';

const orderPlaylist = (playlist) =>
  _.orderBy(playlist, ['priority', 'inserted_index'], ['desc', 'asc']);

const performSongStateChange = (
  state,
  uriToChangeState,
  priorityChangeValue
) => {
  const newPlaylist = state.songs
    .slice(1)
    ?.map((song) =>
      song.uri === uriToChangeState
        ? { ...song, priority: song.priority + priorityChangeValue }
        : song
    )
    .filter(Boolean);
  return {
    ...state,
    songs: [
      state.songs[0],
      state.songs[1],
      ...orderPlaylist(newPlaylist)
    ].filter(Boolean)
  };
};

const playlistReducer = (state = { songs: [], currSong: null }, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST:
      const fetchedPlaylist = orderPlaylist(action.payload);
      return {
        currSong: fetchedPlaylist[0],
        songs: fetchedPlaylist.slice(1)
      };
    case NEW_SONG:
      const firstSong = _.get(state.songs, '[0]');
      if (!firstSong) return { ...state, songs: [action.payload] };
      return {
        ...state,
        songs: orderPlaylist([...state.songs, action.payload])
      };
    case CURR_SONG_STARTED:
      return {
        currSong: state.songs[0],
        songs: state.songs.slice(1)
      };
    case LIKE_SONG:
      return performSongStateChange(state, action.payload.uri, 1);
    case DISLIKE_SONG:
      return performSongStateChange(state, action.payload.uri, -1);
    default:
      return {
        ...state,
        songs: orderPlaylist(state.songs)
      };
  }
};

export default playlistReducer;
