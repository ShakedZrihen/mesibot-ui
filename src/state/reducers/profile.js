import { LOGOUT, UPDATE_PROFILE } from "../actions/profile";

const profileReducer = (state = null, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

export default profileReducer;

