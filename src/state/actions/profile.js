export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';

export const login = (slackUserIdFromStorage) => async dispatch => {
    const profile = { name: 'tomer flom' };
    dispatch({
        type: UPDATE_PROFILE,
        payload: profile
    })
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
}
