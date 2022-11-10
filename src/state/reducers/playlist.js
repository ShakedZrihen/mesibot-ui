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
  console.log({ action, state });
  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        currSong: null,
        songs: orderPlaylist(action.payload)
      };
    case NEW_SONG:
      const firstSong = _.get(state.songs, '[0]');
      if (!firstSong) return { ...state, songs: [action.payload] };
      return {
        ...state,
        songs: orderPlaylist([...state.songs, action.payload])
      };
    case CURR_SONG_STARTED:
      const playlistWithoutFirst = {
        currSong: [state.songs?.[0], state.songs?.[1], state.songs?.[2]].filter(
          Boolean
        ),
        songs: state.songs?.[1] ? orderPlaylist(state.songs.slice(1)) : []
      };
      return playlistWithoutFirst;
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
