import { getPlaylistIdFromUrl } from "../../common/utils/utils";
import serviceClient from '../../common/serviceClient';
import { SERVICE_URL } from "../../common/utils/api.consts";

export const FETCH_PLAYLIST = 'FETCH_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const CURR_SONG_FINISHED = 'CURR_SONG_FINISHED';

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

export const currSongFinished = () => async dispatch => {
    console.log('action-currSongFinished');
    dispatch({
        type: CURR_SONG_FINISHED
    })
}