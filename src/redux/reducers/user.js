import { REGISTER, LOGIN, LOGOUT } from "../actionsTypes";

export const USER = "user"

export const userInitialState = {
    isAuth: false,
    type: "guest",
    authorization: ""
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
            authorization: action.payload.authorization
          };
        }
        case LOGOUT: {
          localStorage.removeItem(USER)
          return {
            ...state,
            isAuth: false,
            type: "guest",
            authorization: ""
          }
        }
        default:
          return state;
    }
};