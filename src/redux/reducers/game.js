import {
  CREATE_GAME, INIT_GAME, LEAVE_GAME, END_GAME,
  JOIN_GAME, UPDATE_GAME, ENABLE_SPELL, GET_PLAYERS_INFO, 
  GET_DIRECTOR_CANDIDATES, DID_SELECT_DIRECTOR_CANDIDATE, 
  DID_VOTE_CURRENT_TURN, VOTE_NOX_CURRENT_TURN, VOTE_NOX_NOTIFIED, 
  GET_CANDIDATES, GET_MINISTER_CARDS, GET_DIRECTOR_CARDS,
  MINISTER_DISCARDED_CARD, DIRECTOR_CHOSE_CARD
} from '../actionsTypes';

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
    ministerHasDiscardedCard: false,
    directorHasChosenCard: false,
    playerRole: "",
    finished: false,
    directorCandidates: [],
    voteStartedCurrentTurn: false,
    voteDoneCurrentTurn: false,
    voteNoxCurrentTurn: false,
    voteNoxNotified: false,
    didSelectDirectorCandidate: false,
    didVoteCurrentTurn: false,
    fenix_promulgations: null,
    death_eater_promulgations: null,
    enabledSpell: false,   
    spell: "",
    playersInfo: [],
    electionCount: 0
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
        case LEAVE_GAME: {
          return {
            ...gameInitialState          
          };
        }
        case END_GAME: {
          return {
            ...gameInitialState
          };
        }
        case UPDATE_GAME: {
          if (action.payload.actualMinister !== state.actualMinister 
            && state.voteDoneCurrentTurn && !action.payload.voteDoneCurrentTurn) {
            /*
            Cambiamos ministro de magia, la votación finalizó, pero el back nos indica que ya estamos con una
            nueva votación, además el rechazo no fue notificado al jugador => nuevo turno de forma local
            */
            return {
              ...state,
              actualMinister: action.payload.actualMinister,
              actualDirector: action.payload.actualDirector,
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
              electionCount: action.payload.electionCount,
              candidateMinister: 0,
              candidateDirector: 0,
              cardsListMinister: [],
              cardsListDirector: [],
              directorCandidates: [],
              ministerHasDiscardedCard: false,
              directorHasChosenCard: false,
              voteStartedCurrentTurn: false,
              voteDoneCurrentTurn: false,
              voteNoxCurrentTurn: false,
              voteNoxNotified: false,
              didSelectDirectorCandidate: false,
              didVoteCurrentTurn: false,
              enabledSpell: false,   
              spell: ""
            };
          } else if (action.payload.actualMinister === state.actualMinister 
            && state.voteDoneCurrentTurn && action.payload.voteDoneCurrentTurn 
            && !state.voteNoxNotified) {
            /*
            No cambiamos ministro de magia, la votación finalizó, y el back nos indica que estamos con una
            la misma votación finalizada, no se rechazó a los candidatos (o se rechazó), pero no se notificó el rechazo
            => actualizamos sólo el tablero forma local
            */
            return {
              ...state, 
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
            };
          } else if ((state.actualMinister === 0) || (action.payload.actualMinister === state.actualMinister 
            && ((!state.voteDoneCurrentTurn && action.payload.voteDoneCurrentTurn) 
            || (!state.voteStartedCurrentTurn && action.payload.voteStartedCurrentTurn)))) {
            /*
            state.actualMinister === 0 => Turno inicial

            No cambiamos ministro de magia, la votación no finalizó, pero el back nos indica que acaba de
            finalizar la votación, o bien la votación no comenzó pero el back nos avisa que empieza
            => actualizamos el turno de forma local
            */
            console.log("State is changing")
            return {
              ...state, 
              actualMinister: action.payload.actualMinister,
              actualDirector: action.payload.actualDirector,
              finished: action.payload.finished,
              fenix_promulgations: action.payload.fenix_promulgations,
              death_eater_promulgations: action.payload.death_eater_promulgations,
              electionCount: action.payload.electionCount,
              voteStartedCurrentTurn: action.payload.voteStartedCurrentTurn,
              voteDoneCurrentTurn: action.payload.voteDoneCurrentTurn
            };
          } else {
            /*
            Por defecto conservamos el turno de forma local
            */
            console.log("State is not changing")
            return {
              ...state
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
        case DID_SELECT_DIRECTOR_CANDIDATE: {
          return {
            ...state,
            didSelectDirectorCandidate: action.payload.didSelectDirectorCandidate
          }
        }
        case DID_VOTE_CURRENT_TURN: {
          return {
            ...state,
            didVoteCurrentTurn: action.payload.didVoteCurrentTurn
          }
        }
        case VOTE_NOX_CURRENT_TURN: {
          return {
            ...state,
            voteNoxCurrentTurn: action.payload.voteNoxCurrentTurn
          }
        }
        case VOTE_NOX_NOTIFIED: {
          return {
            ...state,
            voteNoxNotified: action.payload.voteNoxNotified
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
        case MINISTER_DISCARDED_CARD: {
          return {
            ...state,
            ministerHasDiscardedCard: action.payload.ministerHasDiscardedCard
          }
        }
        case DIRECTOR_CHOSE_CARD: {
          return {
            ...state,
            directorHasChosenCard: action.payload.directorHasChosenCard
          }
        }
        default:
          return state;
    }
};
