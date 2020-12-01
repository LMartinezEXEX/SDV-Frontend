import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import CreateGameForm from './CreateGameForm';
import '../../../assets/css/pregame.css';
import { createGame } from '../../../redux/actions';

const CreateGame= (props) => {
    const { createGame } = props
    const [isOpen, setIsOpen] = useState(false)

    const callbackCreateGame = (Game_Id, Player_Id, minPlayers, maxPlayers) => {
        if (Game_Id !== null && Player_Id !== null) {
          console.log("Game created: { Game_Id: " + Game_Id + ", Player_Id: " + Player_Id + " }")
          createGame({ gameId: Game_Id, playerId: Player_Id, minPlayers: minPlayers, maxPlayers: maxPlayers })
        }
    }
    
    return (
        <div >
            <button className= "app-btn" onClick={() => setIsOpen(true)}> Crear una partida </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <CreateGameForm callbackSubmit={callbackCreateGame} />
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    createGame
};
  
export default connect(null, mapDispatchToProps)(CreateGame);