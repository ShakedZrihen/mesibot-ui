import { getPlaylistIdFromUrl } from "../../common/utils/utils";
import serviceClient from '../../common/serviceClient';
import { SERVICE_URL } from "../../common/utils/api.consts";

export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

const PLAYLIST_SERVICE_URI = `${SERVICE_URL}/spotify/playlist`;

export const fetchPlaylist = () => async dispatch => {
    const playlistId = getPlaylistIdFromUrl();
    const { data } = await serviceClient.get(`${PLAYLIST_SERVICE_URI}/${playlistId}`);
    console.log('after-fetch', { data });
    updatePlaylist(data)(dispatch);
}

export const updatePlaylist = (playlist) => async dispatch => {
    dispatch({
        type: UPDATE_PLAYLIST,
        payload: playlist
    })
}