export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';

export const login = () => async dispatch => {
    const profile = { tomer: 'flom' };
    dispatch({
        type: UPDATE_PROFILE,
        payload: profile
    })
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
}