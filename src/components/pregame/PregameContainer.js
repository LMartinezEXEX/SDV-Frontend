import React, { useEffect } from 'react';
import PreGame from './Pregame';
import '../../assets/css/pregame.css';
//import { USER } from '../../redux/reducers/user';
import { GAME } from '../../redux/reducers/game';
import { NOTIFICATIONS } from '../../redux/reducers/notifications';
import { SERVER_URL, GAME_PATH, LEAVE_NOT_INIT_GAME } from '../constantsEndpoints';

const PreGameContainer = (props) => {
    const { email, gameId } = props

    const leaveGameNotInit = () => {
        //sessionStorage.removeItem(USER)
        sessionStorage.removeItem(GAME)
        sessionStorage.removeItem(NOTIFICATIONS)
        navigator.sendBeacon(SERVER_URL + GAME_PATH + gameId + LEAVE_NOT_INIT_GAME, JSON.stringify({ email: email }))
    }

    useEffect(() => {
      window.addEventListener("beforeunload", leaveGameNotInit, false)    
    })
    
    return (
        <>
        <PreGame />
        </>
    )
}

export default PreGameContainer;