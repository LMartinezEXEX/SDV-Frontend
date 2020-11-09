import { CREATE_GAME, INIT_GAME, JOIN_GAME } from "../actionsTypes";

export const GAME = "game"

export const gameInitialState = {
    isCreator: false,
    gameId: null,
    playerId: null,
    minPlayers: null,
    maxPlayers: null,
    init: false,
}

export default function(state = gameInitialState, action) {
    switch (action.type) {
        case CREATE_GAME: {
          return {
            ...state,
            isCreator: true,
            gameId: action.payload.gameId,
            playerId: action.payload.playerId,
            minPlayers: action.payload.minPlayers,
            maxPlayers: action.payload.maxPlayers
          };
        }
        case INIT_GAME: {
          return {
            ...state,
            init: action.payload.init
          };
        }
        case JOIN_GAME: {
          return {
            ...state,
            isCreator: false,
            gameId: action.payload.gameId,
            playerId: action.payload.playerId            
          };
        }
        default:
          return state;
    }
};