import React, { useState } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import JoinForm from './JoinForm';
import Modal from '../../Modal';
import { setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, LIST_GAMES } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const JoinGame= (props) => {
    const { setMessageTopCenter, setMessageTopCenterOpen } = props
    const [isOpen, setIsOpen] = useState(false)
    const [games, setGames] = useState([])

    const getAvailableGames = async () => {
    
        await axios(
        SERVER_URL + GAME_PATH + LIST_GAMES, { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(response => {
            var data = response.data
            // Descartamos las partidas que alcanzaron el máximo de jugadores
            data = data.filter(game => game.players < game.max_players)
            setGames(data)
            setIsOpen(true)
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

    return (
        <div >
            <button 
            className= "app-btn" 
            onClick={() => getAvailableGames()}
            > 
            Unirse a Partida 
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <JoinForm gameList={games} />
            </Modal>
        </div>
    )
}

const mapDispatchToProps = { 
    setMessageTopCenter, setMessageTopCenterOpen 
}

export default connect(
    null, 
    mapDispatchToProps
)(JoinGame);