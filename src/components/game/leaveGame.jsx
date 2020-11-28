import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { errorTranslate } from '../errorTranslate';
import { leaveGame, reinitMessages, setMessageTopCenter,
        setMessageTopCenterOpen } from "../../redux/actions";
import { 
    SERVER_URL, GAME_PATH, LEAVE_GAME, PLAYER_ID_QUERY_STRING
} from '../constantsEndpoints';

const LeaveGame = (props) => {
    const {gameId, playerId, onSelect, leaveGame, reinitMessages} = props

    const leaveGameInit  = async () => {
        await axios.post(
            SERVER_URL + GAME_PATH + gameId + LEAVE_GAME + PLAYER_ID_QUERY_STRING + playerId
        ).then(response => {
            if (response.status === 200) {
                console.log("Leaving game...")
                reinitMessages()
                leaveGame()
            }        
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }   

    return (
        <div>
            <div> ¿Seguro que deseas abandonar la partida? </div>
            <div className="buttonSection">
                <button className="app-btn game-button" onClick={() => {leaveGameInit(); onSelect()}}> SI </button>
                <button className="app-btn game-button" onClick={() => onSelect()}> NO </button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
    };
}

const mapDispatchToProps = { 
    leaveGame, reinitMessages,
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LeaveGame);
