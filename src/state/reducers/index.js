import { combineReducers } from 'redux';
import uiState from './ui-state';
import profile from './profile';

export default combineReducers({
    uiState,
    profile
})
