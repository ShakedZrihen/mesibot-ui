import { combineReducers } from 'redux';
import uiState from './ui-state';
import profile from './profile';
import chat from './chat';
import playlist from './playlist';

export default combineReducers({
    uiState,
    profile,
    chat,
    playlist
})
