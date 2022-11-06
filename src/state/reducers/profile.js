import { LOGOUT, UPDATE_PROFILE } from "../actions/profile";

export const PROFILE_STATES = {
    UNKNOWN: 'unknown',
    NOT_AUTH: 'not-auth'
}

const profileReducer = (state = PROFILE_STATES.UNKNOWN, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return action.payload;

        case LOGOUT:
            return PROFILE_STATES.NOT_AUTH;
        default:
            return state;
    }
}

export default profileReducer;

