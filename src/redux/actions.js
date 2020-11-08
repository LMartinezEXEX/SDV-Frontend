import { REGISTER, LOGIN, LOGOUT } from './actionsTypes';

export const register = (content) => ({
    type: REGISTER,
    payload: {
        content
    }
})

export const login = (content) => ({
    type: LOGIN,
    payload: {
        isAuth: content.isAuth,
        type: content.type,
        authorization: content.authorization,
        email: content.email,
        username: content.username
    }
})

export const logout = (content) => ({
    type: LOGOUT,
    payload: {
        content
    }
})
