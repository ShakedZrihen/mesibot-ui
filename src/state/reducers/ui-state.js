import _ from 'lodash';
import { NEW_UI_STATE_ACTION } from '../actions/ui-state';

const uiStateReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_UI_STATE_ACTION:
            console.log('flom-uiStateReducer');
            return action.payload;
        default:
            return state;
    }
}

export default uiStateReducer;

