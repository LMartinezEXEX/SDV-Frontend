import {
    REGISTER, LOGIN, LOGOUT, GET_ICON, UPDATE_USERNAME, CREATE_GAME, JOIN_GAME, 
    INIT_GAME, LEAVE_GAME, END_GAME, UPDATE_GAME, ENABLE_SPELL,
    GET_PLAYERS_INFO, GET_DIRECTOR_CANDIDATES, DID_SELECT_DIRECTOR_CANDIDATE, 
    DID_VOTE_CURRENT_TURN, VOTE_NOX_CURRENT_TURN, VOTE_NOX_NOTIFIED, 
    GET_CANDIDATES, GET_MINISTER_CARDS, GET_DIRECTOR_CARDS,
    MINISTER_DISCARDED_CARD, DIRECTOR_CHOSE_CARD, 
    REINIT_MESSAGES, MESSAGE_TOP_CENTER_OPEN, SET_MESSAGE_TOP_CENTER, 
    MESSAGE_BOTTOM_LEFT_OPEN, SET_MESSAGE_BOTTOM_LEFT
} from './actionsTypes';

/* USER */

export const updateUsername = (content) => ({
    type: UPDATE_USERNAME,
    payload: {
      username: content.newUsername
    }
})

export const getIcon = (content) => ({
    type: GET_ICON,
    payload: {
      avatar: content.avatar 
    }
})

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

/* GAME */

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

export const leaveGame = (content) => ({
    type: LEAVE_GAME,
    payload: {
        content
    }
})

export const endGame = (content) => ({
    type: END_GAME,
    payload: {
        content
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
        voteStartedCurrentTurn: content.voteStartedCurrentTurn,
        voteDoneCurrentTurn: content.voteDoneCurrentTurn
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

export const selectDirectorCandidate = (content) => ({
    type: DID_SELECT_DIRECTOR_CANDIDATE,
    payload: {
        didSelectDirectorCandidate: content.didSelectDirectorCandidate
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

export const ministerDiscardedCard = (content) => ({
    type: MINISTER_DISCARDED_CARD,
    payload: {
        ministerHasDiscardedCard: content.ministerHasDiscardedCard
    }
})

export const directorChoseCard = (content) => ({
    type: DIRECTOR_CHOSE_CARD,
    payload: {
        directorHasChosenCard: content.directorHasChosenCard
    }
})

/* NOTIFICATIONS */
export const reinitMessages = (content) => ({
    type: REINIT_MESSAGES,
    payload: {
        content
    }
})

export const setMessageTopCenterOpen = (content) => ({
    type: MESSAGE_TOP_CENTER_OPEN,
    payload: {
        messageTopCenterOpen: content.messageTopCenterOpen
    }
})

export const setMessageTopCenter = (content) => ({
    type: SET_MESSAGE_TOP_CENTER,
    payload: {
        messageSeverity: content.messageSeverity,
        messageTopCenter: content.messageTopCenter
    }
})

export const setMessageBottomLeftOpen = (content) => ({
    type: MESSAGE_BOTTOM_LEFT_OPEN,
    payload: {
        messageBottomLeftOpen: content.messageBottomLeftOpen
    }
})

export const setMessageBottomLeft = (content) => ({
    type: SET_MESSAGE_BOTTOM_LEFT,
    payload: {
        messageBottomLeft: content.messageBottomLeft
    }
})