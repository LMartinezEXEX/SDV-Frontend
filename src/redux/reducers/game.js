import {
  CREATE_GAME, UPDATE_MINISTER, INIT_GAME,
  JOIN_GAME , UPDATE_GAME, ENABLE_SPELL, GET_PLAYERS_INFO, 
  GET_DIRECTOR_CANDIDATES, DID_VOTE_CURRENT_TURN
} from "../actionsTypes";

export const GAME = "game"

export const gameInitialState = {
    isCreator: false,
    gameId: null,
    gameName: "",
    playerId: null,
    minPlayers: null,
    maxPlayers: null,
    amountPlayers: null,
    init: false,
    actualMinister: 0,
    actualDirector: 0,
    playerRole: "",
    finished: false,
    directorCandidates: [],
    didVoteCurrentTurn: false,
    fenix_promulgations: null,
    death_eater_promulgations: null,
    enabledSpell: false,   
    spellToUse: "",
    playersInfo: []
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
            init: true,
            amountPlayers: action.payload.amountPlayers,
            playerRole: action.payload.playerRole
          };
        }
        case JOIN_GAME: {
          return {
            ...state,
            isCreator: false,
            gameId: action.payload.gameId,
            playerId: action.payload.playerId,
            init: false            
          };
        }
        case UPDATE_MINISTER: {
            return {
              ...state,
              actualMinister: action.payload.newMinister
            }
          };
        case UPDATE_GAME: {
          return {
            ...state, 
            actualMinister: action.payload.actualMinister,
            actualDirector: action.payload.actualDirector,
            finished: action.payload.finished,
            fenix_promulgations: action.payload.fenix_promulgations,
            death_eater_promulgations: action.payload.death_eater_promulgations,
          };
        }
        case ENABLE_SPELL: {
          return {
            ...state,
            enabledSpell: action.payload.enabledSpell,
            spell: action.payload.spell
          }
        }
        case GET_PLAYERS_INFO: {
          return {
            ...state,
            playersInfo: action.payload.playersInfo
          }
        }
        case GET_DIRECTOR_CANDIDATES: {
          return {
            ...state,
            directorCandidates: action.payload.directorCandidates
          }
        }
        case DID_VOTE_CURRENT_TURN: {
          return {
            ...state,
            didVoteCurrentTurn: action.payload.didVoteCurrentTurn
          }
        }
        default:
          return state;
    }
};