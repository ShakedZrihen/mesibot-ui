import axios from 'axios';
import { SERVICE_URL } from '../../common/utils/api.consts';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';

export const login = (slackUserId) => async dispatch => {
    const profileUrl = `${SERVICE_URL}/slack/users/${slackUserId}`;
    const { data: profile } = await axios.get(profileUrl);
    dispatch({
        type: UPDATE_PROFILE,
        payload: profile
    })
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
}
