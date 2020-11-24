import { REGISTER, LOGIN, LOGOUT, GET_ICON, UPDATE_USERNAME } from '../actionsTypes';
import { SERVER_URL, USER_ICON } from '../../components/constantsEndpoints';

export const USER = "user"

export const userInitialState = {
    isAuth: false,
    type: "guest",
    authorization: "",
    email: "",
    username: "",
    icon: ""
}

export default function(state = userInitialState, action) {
    switch (action.type) {
        case REGISTER: {
          return {
            ...state
          };
        }
        case LOGIN: {
          return {
            ...state,
            isAuth: action.payload.isAuth,
            type: action.payload.type,
            authorization: action.payload.authorization,
            email: action.payload.email,
            username: action.payload.username,
            icon: SERVER_URL + USER_ICON + action.payload.email
          };
        }
        case LOGOUT: {
          localStorage.removeItem(USER)
          return {
            ...state,
            isAuth: false,
            type: "guest",
            authorization: "",
            email: "",
            username: "",
            icon: ""
          }
        }
        case UPDATE_USERNAME: {
          return {
            ...state,
            username: action.payload.username
          };
        }
        case GET_ICON: {
          return {
            ...state,
            icon: SERVER_URL + USER_ICON + state.email + action.payload.timeBreaker
          };
        }
        default:
          return state;
    }
};