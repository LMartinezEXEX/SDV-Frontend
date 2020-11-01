import React from 'react'
import StartGame from "./StartGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"

const Pregame = () => {
    return (
        <div className='pre-game'>
            <div className = 'window-style'>
                <ul className="players-list">
                    <li>Player 1 </li>
                    <li>Player 2 </li>
                    <li>Player 3 </li>
                    <li>Player 4 </li>
                    <li>Player 5 </li>
                </ul>
            </div>
            <StartGame />
        </div>
    );
}

export default Pregame

