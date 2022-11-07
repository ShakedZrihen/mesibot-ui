import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { getPlaylistIdFromUrl } from '../../common/utils/utils';
import useChannelPlaylistListener from './useChannelPlaylistListener';


const PUSHER_ENV = {
    APP_ID: '1502377',
    API_KEY: 'c56e77b988119871f7d3',
    SECRET: '1c384e9d103f926cb170',
    CLUSTER: 'mt1'
}

const usePusher = () => {
    const playlistId = getPlaylistIdFromUrl();

    const pusher = new Pusher(PUSHER_ENV.API_KEY, {
        cluster: PUSHER_ENV.CLUSTER,
    });

    useChannelPlaylistListener({ pusher, playlistId })

    useEffect(() => {
        return () => {
            pusher.disconnect();
        }
    })
}

export default usePusher;