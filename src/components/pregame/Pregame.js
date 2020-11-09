import React from 'react'
import { connect } from 'react-redux';
import StartGame from "./StartGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"
import { initGame } from "../../redux/actions";

const Pregame = (props) => {
    const { initGame, isCreator } = props

    if (isCreator) {
        const callbackInitGame = () => {
            /* Debería haber un chequeo al server para ver el número de jugadores
            Entonces debería traer el mínimo y máximo de jugadores de la partida
            Algo como lo que sigue
            */
            /*
            checkplayers_url_part_1 = "http://127.0.0.1:8000/game/"
            checkplayers_url_part_2 = "/players"
            const result = axios(
                checkplayers_url_part_1 + gameId + checkplayers_url_part_2, {
                    method: "GET"
                }
            )
            if (minPlayers <= result.data.players) {
                initGame(true)
            } else {
                alert("Not enough players: " + result.data.players)
            }
            */
            initGame({ init: true })
        }  
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
                <StartGame callbackSubmit={callbackInitGame} />
            </div>
        );
    } else {
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isCreator: state.game.isCreator
    };
}

const mapDispatchToProps = {
    initGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Pregame);    