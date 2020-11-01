import React from 'react'
import '../../assets/css/game.css'
import axios from 'axios';


const ChargesTable = ({gameState, gameUpdater}) => {

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
        .then(res => {
            gameUpdater()
        })
    }

    return (
        <div className="chargeTable">
            <ul>
                <button onClick={changeMinister}>Elegir ministro</button>
                <li>Ministro: {gameState.current_minister_id} </li>
                <li>Presidente:{"-"} </li>
            </ul>
        </div>
    )
}

export default ChargesTable