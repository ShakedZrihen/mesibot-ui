export const CHAT_RECIEVE_NEW_MESSAGE = 'CHAT_RECIEVE_NEW_MESSAGE';

export const recieveNewMessage = (message) => async dispatch => {
    //message: {content, author, sentAt}
    dispatch({
        type: CHAT_RECIEVE_NEW_MESSAGE,
        payload: message
    })
}