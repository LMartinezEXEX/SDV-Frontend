import {
  CREATE_GAME, UPDATE_MINISTER, INIT_GAME,
  JOIN_GAME , UPDATE_GAME, ENABLE_SPELL, GET_PLAYERS_INFO, 
  GET_DIRECTOR_CANDIDATES, DID_VOTE_CURRENT_TURN,
  HAS_OPEN_TABLE_CURRENT_TURN, 
  GET_CANDIDATES, GET_MINISTER_CARDS, 
  GET_DIRECTOR_CARDS
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
    candidateMinister: 0,
    candidateDirector: 0,
    cardsListMinister: [],
    cardsListDirector: [],
    playerRole: "",
    finished: false,
    directorCandidates: [],
    voteDoneCurrentTurn: false,
    hasOpenTableCurrentTurn: false,
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
          if (action.payload.actualMinister != state.actualMinister 
            && state.voteDoneCurrentTurn && state.hasOpenTableCurrentTurn) {
            return {
              ...state,
              actualMinister: action.payload.actualMinister,
              actualDirector: action.payload.actualDirector,
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
              candidateMinister: 0,
              candidateDirector: 0,
              cardsListMinister: [],
              cardsListDirector: [],
              directorCandidates: [],
              voteDoneCurrentTurn: false,
              didVoteCurrentTurn: false,
              hasOpenTableCurrentTurn: false,
              enabledSpell: false,   
              spellToUse: ""
            };
          } else if (action.payload.actualMinister !== state.actualMinister 
            && state.voteDoneCurrentTurn && !state.hasOpenTableCurrentTurn) {
            return {
              ...state, 
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
            };
          } else if (action.payload.actualMinister === state.actualMinister 
            && !state.voteDoneCurrentTurn && !state.hasOpenTableCurrentTurn) {
            return {
              ...state, 
              actualMinister: action.payload.actualMinister,
              actualDirector: action.payload.actualDirector,
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
              voteDoneCurrentTurn: action.payload.voteDoneCurrentTurn
            };
          } else {
            return {
              ...state, 
              actualMinister: action.payload.actualMinister,
              actualDirector: action.payload.actualDirector,
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
              voteDoneCurrentTurn: action.payload.voteDoneCurrentTurn
            };            
          }
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
        case HAS_OPEN_TABLE_CURRENT_TURN: {
          return {
            ...state,
            hasOpenTableCurrentTurn: action.payload.hasOpenTableCurrentTurn
          }
        }
        case DID_VOTE_CURRENT_TURN: {
          return {
            ...state,
            didVoteCurrentTurn: action.payload.didVoteCurrentTurn
          }
        }
        case GET_CANDIDATES: {
          return {
            ...state,
            candidateMinister: action.payload.candidateMinister,
            candidateDirector: action.payload.candidateDirector
          }
        }
        case GET_MINISTER_CARDS: {
          return {
            ...state,
            cardsListMinister: action.payload.cardsListMinister
          }
        }
        case GET_DIRECTOR_CARDS: {
          return {
            ...state,
            cardsListDirector: action.payload.cardsListDirector
          }
        }
        default:
          return state;
    }
};