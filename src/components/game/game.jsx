import React, { useState} from 'react'
import axios from 'axios'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import PopUp from './PopUp'
import { useParams } from 'react-router-dom';

const Game= () => {
    const [gameState, setgameState] = useState({
        gameId: useParams().id,
        finished: false,
        fenix_promulgations: 0,
        death_eater_promulgations: 0,
        current_minister_id: 0,
        current_director_id: 0
    })

    const getGameState = async() => {
        await axios.get("http://127.0.0.1:8000/game/"+gameState.gameId+"/check_game", { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            var data = res.data
            setgameState({
                gameId: data["game id"],
                finished: data["finished"],
                fenix_promulgations: data["fenix promulgations"],
                death_eater_promulgations: data["death eater promulgations"],
                current_minister_id: data["current minister id"],
                current_director_id: data["current director id"]})
        })
    }

    return(
    <div className="gameView">
        <div className="gameBox">
            <div className="gameSection">
                <MortifagoBoard gameState={gameState}/>
            </div>
            <div className="gameSection">
                <div className="buttonSection">
                    <div><PopUp gameState={gameState} gameUpdater={getGameState} 
                        type="Cargos"/></div>
                    <div><PopUp gameState={gameState} gameUpdater={getGameState} 
                        type="Votar"/></div>
                    <div><PopUp gameState={gameState} gameUpdater={getGameState}
                        type="Cartas"/></div>
                </div>
            </div>
            <div className="gameSection">
                <OrderBoard gameState={gameState}/>
            </div>
        </div>
    </div>);
}

export default Game;

