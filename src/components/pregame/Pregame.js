import React, { useState } from 'react'
import { connect } from 'react-redux';
import StartGame from "./StartGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"
import { initGame } from "../../redux/actions";
import axios from 'axios';
import useInterval from '../../useInterval'

const Pregame = (props) => {
    const { isCreator, gameId, playerId, initGame} = props
    const [playersPregame, setPlayersPregame] = useState([])

    // Jugadores que no son creadores
    const checkAndJoinGame = async () => {
        const check_game_url = "http://127.0.0.1:8000/game/initialized/"
        await axios(
            check_game_url + gameId + '?player_id=' + playerId
        ).then(response => {
            if (response.status === 200 
                && response.data.game_state === 1) {
                initGame(
                    {
                        init:true, 
                        amountPlayers:response.data.amount_of_players,
                        playerRole:response.data.rol
                    }
                )
            } else {
                setPlayersPregame(response.data.users)
            }
        }).catch(error => {
            console.log(error)
        });
    }

    useInterval(async () => {
        console.log("Checking...")
        await checkAndJoinGame()
    }, 1000)

    if (isCreator) {
        const callbackInitGame = async () => {
            /* Debería haber un chequeo al server para ver el número de jugadores
               Entonces debería traer el mínimo y máximo de jugadores de la partida
               Algo como lo que sigue
            */
            const init_game_url = "http://127.0.0.1:8000/game/init/"
            await axios.put(
                init_game_url + gameId + "?player_id=" + playerId
            ).then(response => {
                initGame(
                    {
                        init: true, 
                        amountPlayers: response.data.amount_of_players,
                        playerRole: response.data.rol
                    }
                )
            }).catch(error => {
                console.log(error)
            });
        }
        return (
            <div className='pre-game'>
                <div className = 'window-style'>
                    <ul className="players-list">
                        {
                            playersPregame.sort(
                                function (user_a, user_b) {
                                    return (user_a.username > user_b.username)?(1):(-1)
                            }).map(player => {
                                return <li key={player.username}> {player.username} </li>
                            })
                        }
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
                        {
                            playersPregame.sort(
                                function (user_a, user_b) {
                                    return (user_a.username > user_b.username)?(1):(-1)
                            }).map(player => {
                                return <li key={player.username} > {player.username} </li>
                            })
                        }
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pregame);