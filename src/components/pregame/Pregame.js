import React from 'react'
import StartGame from "./StartGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"
import { useParams } from 'react-router-dom';

const Pregame = () => {
    return (
        <div className='pre-game'>
            <div className = 'window-style'>
                <ul className="players-list">
                    <li> Harry54 </li>
                    <li> Hermione21 </li>
                    <li> Hagrid666 </li>
                    <li> Draco55 </li>
                    <li> Ron12 </li>
                </ul>
            </div>
            <StartGame gameId={useParams().id}/>
        </div>
    );
}

export default Pregame

