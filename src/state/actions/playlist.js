import { getPlaylistIdFromUrl } from "../../common/utils/utils";
import serviceClient from '../../common/serviceClient';
import { SERVICE_URL } from "../../common/utils/api.consts";

export const FETCH_PLAYLIST = 'FETCH_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const CURR_SONG_STARTED = 'CURR_SONG_STARTED';
export const LIKE_SONG = 'LIKE_SONG';
export const DISLIKE_SONG = 'DISLIKE_SONG';

const PLAYLIST_SERVICE_URI = `${SERVICE_URL}/spotify/playlist`;

export const fetchPlaylist = () => async dispatch => {
    const playlistId = getPlaylistIdFromUrl();
    const { data } = await serviceClient.get(`${PLAYLIST_SERVICE_URI}/${playlistId}`);
    dispatch({
        type: FETCH_PLAYLIST,
        payload: data
    })
}

export const updatePlaylist = (playlist) => async dispatch => {
    dispatch({
        type: UPDATE_PLAYLIST,
        payload: playlist
    })
}

export const currSongStarted = () => async dispatch => {
    dispatch({
        type: CURR_SONG_STARTED
    })
}

export const likeSong = (song) => async dispatch => {
    dispatch({
        type: LIKE_SONG,
        payload: song
    })
}

export const dislikeSong = (song) => async dispatch => {
    dispatch({
        type: DISLIKE_SONG,
        payload: song
    })
}