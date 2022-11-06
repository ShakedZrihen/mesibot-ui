export const NEW_UI_STATE_ACTION = 'new-ui-state-action';

export const newUiStateAction = payload => async dispatch => {
    dispatch({
        type: NEW_UI_STATE_ACTION,
        payload
    });
}
