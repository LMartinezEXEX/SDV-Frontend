import { REGISTER, LOGIN, /*LOGOUT*/ CREATE_GAME, JOIN_GAME, INIT_GAME} from './actionsTypes';

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
    authorization: content.authorization
  }
})
/*
export const logout = (content) => ({
  type: LOGOUT,
  payload: {
    isAuth: content.isAuth,
    type: content.type,
    authorization: content.authorization
  }
})
*/
export const createGame = (content) => ({
  type: CREATE_GAME,
  payload: {
    gameId: content.gameId,
    playerId: content.playerId,
    minPlayers: content.minPlayers,
    maxPlayers: content.maxPlayers
  }
})

export const joinGame = (content) => ({
  type: JOIN_GAME,
  payload: {
    gameId: content.gameId,
    playerId: content.playerId
  }
})

export const initGame = (content) => ({
  type: INIT_GAME,
  payload: {
    init: content.init
  }
})

