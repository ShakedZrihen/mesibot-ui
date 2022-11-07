import axios from 'axios';
import { getPlaylistIdFromUrl, LOCAL_STORAGE_KEYS } from './utils/utils';

axios.interceptors.request.use(
    function (config) {
        const userSlackId = localStorage.getItem(LOCAL_STORAGE_KEYS.SLACK_AUTH_QS);
        const channel = getPlaylistIdFromUrl();

        if (userSlackId) {
            config.headers['userSlackId'] = userSlackId;
            config.headers['channel'] = channel;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axios;