import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { joinGame, setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, JOIN } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const JoinForm = (props) => {
    const { 
        email, joinGame, gameList, 
        setMessageTopCenter, setMessageTopCenterOpen
    } = props
  
    const handleClick = async (gameId) => {        
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + JOIN, {
            email: email
        }).then(response => {
            if (response.status === 200 && response.data.Player_Id !== undefined) {
                joinGame({ gameId: gameId, playerId: response.data.Player_Id })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    
    if (gameList.length === 0) {
        return (
            <div>
                <li> NO HAY PARTIDAS ACCESIBLES </li>
            </div>
        )
    } else {
        return (
            <div>
                <ul className="game-list">
                    {gameList.map(game =>
                        <li><button className="buttonTaker" onClick={() =>
                        handleClick(game.id)}> {game.name} </button></li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    };
}
const mapDispatchToProps = {
    joinGame, 
    setMessageTopCenter, setMessageTopCenterOpen
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinForm);
