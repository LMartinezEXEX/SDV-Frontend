import { REGISTER, LOGIN, LOGOUT, UPDATE_USERNAME, CREATE_GAME, JOIN_GAME, END_GAME,
        INIT_GAME, UPDATE_MINISTER, UPDATE_GAME, ENABLE_SPELL,
        GET_PLAYERS_INFO, GET_DIRECTOR_CANDIDATES, DID_VOTE_CURRENT_TURN, 
        VOTE_NOX_CURRENT_TURN, VOTE_NOX_NOTIFIED, 
        GET_CANDIDATES, GET_MINISTER_CARDS, GET_DIRECTOR_CARDS, LEAVE_GAME
} from './actionsTypes';

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
        init: content.init,
        actualMinister: content.actualMinister,
        amountPlayers: content.amountPlayers,
        playerRole: content.playerRole
    }
})

export const endGame = (content) => ({
    type: END_GAME,
    payload: {
        content
    }
})

export const updateUsername = (content) => ({
    type: UPDATE_USERNAME,
    payload: {
      username: content.newUsername
    }
})

export const updateMinister = (content) => ({
    type: UPDATE_MINISTER,
    payload: {
        newMinister: content.newMinister
    }
})

export const updateGameState = (content) => ({
    type: UPDATE_GAME, 
    payload: {
        actualMinister: content.actualMinister,
        actualDirector: content.actualDirector,
        finished: content.finished,
        fenix_promulgations: content.fenix_promulgations,
        death_eater_promulgations: content.death_eater_promulgations,
        voteDoneCurrentTurn: content.voteDoneCurrentTurn,
        expelliarmus: content.expelliarmus,
        ministerConsent: content.ministerConsent,
    }
})

export const enableSpell = (content) => ({
    type: ENABLE_SPELL,
    payload: {
        enabledSpell: content.enabledSpell,
        spell: content.spell
    }
})

export const getPlayersInfo = (content) => ({
    type: GET_PLAYERS_INFO,
    payload: {
        playersInfo: content.playersInfo
    }
})

export const getDirectorCandidates = (content) => ({
    type: GET_DIRECTOR_CANDIDATES,
    payload: {
        directorCandidates: content.directorCandidates
    }
})

export const voteCurrentTurn = (content) => ({
    type: DID_VOTE_CURRENT_TURN,
    payload: {
        didVoteCurrentTurn: content.didVoteCurrentTurn
    }
})

export const rejectCandidates = (content) => ({
    type: VOTE_NOX_CURRENT_TURN,
    payload: {
        voteNoxCurrentTurn: content.voteNoxCurrentTurn
    }
})

export const rejectCandidatesNotified = (content) => ({
    type: VOTE_NOX_NOTIFIED,
    payload: {
        voteNoxNotified: content.voteNoxNotified
    }
})

export const getCandidates = (content) => ({
    type: GET_CANDIDATES,
    payload: {
        candidateMinister: content.candidateMinister,
        candidateDirector: content.candidateDirector
    }
})

export const getMinisterCards = (content) => ({
    type: GET_MINISTER_CARDS,
    payload: {
        cardsListMinister: content.cardsListMinister
    }
})

export const getDirectorCards = (content) => ({
    type: GET_DIRECTOR_CARDS,
    payload: {
        cardsListDirector: content.cardsListDirector
    }
})

export const leaveGame = (content) => ({
    type: LEAVE_GAME,
    payload: {
    }
})

