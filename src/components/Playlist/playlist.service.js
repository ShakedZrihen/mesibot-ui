import serviceClient from '../../common/serviceClient';
import { SERVICE_URL } from '../../common/utils/api.consts';
import { getPlaylistIdFromUrl } from '../../common/utils/utils';

const PLAYLIST_SERVICE_URI = `${SERVICE_URL}/spotify/playlist`;

export const fetchPlaylist = async () => {
    const playlistId = getPlaylistIdFromUrl();
    const { data } = await serviceClient.get(`${PLAYLIST_SERVICE_URI}/${playlistId}`);
    return data;
}