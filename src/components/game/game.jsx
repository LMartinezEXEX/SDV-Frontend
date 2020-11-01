<<<<<<< HEAD
import React, { useState, useEffect} from 'react'
import axios from 'axios'
=======
import React from 'react'
>>>>>>> 3b73e232f4520d5b6d1e6204e244c8bba3ea57c2
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import PopUp from './PopUp'

const Game= () => {
    const [actualMinister, setNextMinister] = useState(0)
    const [slots, setSlot] = useState([])
    const [proclamationsM, addProclamationM] = useState(0)
    const [gameState, setgameState] = useState({
        finished: false,
        fenix_promulgations: 0,
        death_eater_promulgations: 0,
        current_minister_id: 0,
        current_director_id: 0
    })

    const getGameState = async() => {
        await axios.get("http://127.0.0.1:8000/game/"+3+/*Replace with gameId*/"/check_game", { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            var data = res.data
            setgameState({
                finished: data["finished"],
                fenix_promulgations: data["fenix promulgations"],
                death_eater_promulgations: data["death eater promulgations"],
                current_minister_id: data["current minister id"],
                current_director_id: data["current director id"]})
        })
        if(gameState.death_eater_promulgations === 6){
            alert("GANARON LOS MORTIFAGOS")
        }
        else if( gameState.fenix_promulgations === 5){
            alert("GANO LA ORDEN DEL FENIX")
        }
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
                    <div><PopUp minister={actualMinister} 
                        setMinister={setNextMinister}type="Votar"/></div>
                    <div><PopUp gameState={gameState} gameUpdater={getGameState}
                        type="Cards"/></div>
                </div>
            </div>
            <div className="gameSection">
                <OrderBoard gameState={gameState}/>
            </div>
        </div>
    </div>);
}

export default Game;

