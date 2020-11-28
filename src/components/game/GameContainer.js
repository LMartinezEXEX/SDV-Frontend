import React, { useEffect } from 'react';
import Game from './game';
import '../../assets/css/pregame.css';
//import { USER } from '../../redux/reducers/user';
import { GAME } from '../../redux/reducers/game';
import { NOTIFICATIONS } from '../../redux/reducers/notifications';
import { SERVER_URL, GAME_PATH, LEAVE_GAME, PLAYER_ID_QUERY_STRING } from '../constantsEndpoints';

const GameContainer = (props) => {
    const { gameId, playerId } = props

    const leaveGameInit = () => {
        //sessionStorage.removeItem(USER)
        sessionStorage.removeItem(GAME)
        sessionStorage.removeItem(NOTIFICATIONS)
        navigator.sendBeacon(SERVER_URL + GAME_PATH + gameId + LEAVE_GAME + PLAYER_ID_QUERY_STRING + playerId)
    }

    useEffect(() => {
      window.addEventListener("beforeunload", leaveGameInit, false)    
    })
    
    return (
        <>
        <Game />
        </>
    )
}

export default GameContainer;