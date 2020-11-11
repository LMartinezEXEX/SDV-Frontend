import React from 'react'
import { connect } from 'react-redux';
import StartGame from "./StartGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"
import { initGame } from "../../redux/actions";
import axios from 'axios';
import useInterval from '../../useInterval'

const Pregame = (props) => {
    const { isCreator, gameId, playerId, initGame, joinGame } = props

    const checkAndJoinGame = async () => {
        const check_game_url_part_1 = "http://127.0.0.1:8000/game/initialized/"
        // const check_game_url_part_2 = "/initialized"
        await axios(
            check_game_url_part_1 + gameId + '?player_id=' +playerId
        ).then(response => {
            if (response.status === 200 && response.data.ok) {
                initGame({init:true})
            }
        }).catch(error => {
            console.log(error)
        });
    }

    useInterval(async () => {
        console.log("Checking...")
        await checkAndJoinGame()
    }, 2000)

    if (isCreator) {
        const callbackInitGame = async () => {
            /* Debería haber un chequeo al server para ver el número de jugadores
               Entonces debería traer el mínimo y máximo de jugadores de la partida
               Algo como lo que sigue
            */
            const init_game_url = "http://127.0.0.1:8000/game/init/"
            const result = await axios.put(
                init_game_url + gameId + "?player_id=" + playerId
            ).then(response => {
                initGame({init:true})
                return response.data
            }).catch(error => {
                console.log(error)
                return error
            });
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
        isCreator: state.game.isCreator,
        gameId: state.game.gameId,
        playerId: state.game.playerId
    };
}

const mapDispatchToProps = {
    initGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Pregame);    