import { CHAT_RECIEVE_NEW_MESSAGE } from "../actions/chat";

const defaultState = {
    messages: []
}

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHAT_RECIEVE_NEW_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };

        default:
            return state;
    }
}

export default profileReducer;

