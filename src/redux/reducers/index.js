import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import notifications from './notifications';

export default combineReducers({ user , game, notifications });
