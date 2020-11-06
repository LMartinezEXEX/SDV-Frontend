import { REGISTER, LOGIN, /*LOGOUT*/ } from "../actionsTypes";

const initialState = {
    isAuth: false,
    type: "guest",
    authorization: ""
}

export default function(state = initialState, action) {
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
        /*case LOGOUT: {
          return {
            ...state,
            isAuth: action.payload.isAuth,
            type: action.payload.type,
            authorization: action.payload.authorization
          }
        }*/
        default:
          return state;
    }
};