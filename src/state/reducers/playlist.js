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

const playlistReducer = (state = { songs: [], currSong: null }, action) => {
  console.log({ action, state });
  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        currSong: null,
        songs: orderPlaylist(action.payload)
      };

    // case UPDATE_PLAYLIST:
    //     const firstSong = _.get(action, 'payload[0]');
    //     const playlist = orderPlaylist(action.payload.slice(1));
    //     return orderPlaylist([firstSong, ...playlist]);

    case NEW_SONG:
      const firstSong = _.get(state.songs, '[0]');
      if (!firstSong) return { ...state, songs: [action.payload] };
      return {
        ...state,
        songs: orderPlaylist([...state.songs, action.payload])
      };
    //   console.log({
    //     first: state[0],
    //     rest: [
    //       ...orderPlaylist([
    //         ...(state.length > 0 ? state.slice(1) : []),
    //         action.payload
    //       ])
    //     ]
    //   });
    //   return [
    //     ...(state[0] ? [state[0]] : []),
    //     ...orderPlaylist([
    //       ...(state.length > 0 ? state.slice(1) : []),
    //       action.payload
    //     ])
    //   ];

    case CURR_SONG_STARTED:
      const playlistWithoutFirst = {
        currSong: state.songs?.[0],
        songs: state.songs?.[1] ? orderPlaylist(state.songs.slice(1)) : []
      };
      console.log({ playlistWithoutFirst });
      return playlistWithoutFirst;

    case LIKE_SONG:
      return {
        ...state,
        songs: orderPlaylist(
          state.songs.map((song) =>
            song.uri === action.payload.uri
              ? { ...song, priority: song.priority + 1 }
              : song
          )
        )
      };

    case DISLIKE_SONG:
      return {
        ...state,
        songs: orderPlaylist(
          state.songs.map((song) =>
            song.uri === action.payload.uri
              ? { ...song, priority: song.priority - 1 }
              : song
          )
        )
      };
    default:
      return {
        ...state,
        songs: orderPlaylist(state.songs)
      };
  }
};

export default playlistReducer;
