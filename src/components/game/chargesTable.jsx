import React from 'react'
import '../../assets/css/game.css'
import axios from 'axios';


const ChargesTable = (props) => {
    const {gameState, gameUpdater} = props
    const players = ['Harry54', 'Hermione21', 'Hagrid666', 'Draco55', 'Ron12']

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
        .then(res => {
            gameUpdater()
        })
    }

    return (
        <div className="chargeTable">
            <ul>
                <button onClick={()=>changeMinister()}>Primer Ministro</button>
                {/* equation to get the current minister id depends the gameID */}
                <li>Ministro: {players[(gameState.current_minister_id-(5*(gameState.gameId-1))-1)]} </li>
                <li>Presidente:{"-"} </li>
            </ul>
        </div>
    )
}

export default ChargesTable