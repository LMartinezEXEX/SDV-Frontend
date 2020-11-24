import { REGISTER, LOGIN, LOGOUT, UPDATE_USERNAME, GET_ICON } from "../actionsTypes";

const icon_url_part_1 = "http://127.0.0.1:8000/user/icon/"
const icon_url_part_2 = "/"

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
            icon: icon_url_part_1 + action.payload.email + icon_url_part_2
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
            icon: icon_url_part_1 + state.email + icon_url_part_2 + action.payload.avatar
          };
        }
        default:
          return state;
    }
};