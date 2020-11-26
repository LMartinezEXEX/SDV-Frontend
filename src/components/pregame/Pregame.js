import React, { useState } from 'react'
import { connect } from 'react-redux';
import StartGame from "./StartGame"
import LeaveGame from "./LeaveGame"
import DeleteGame from "./DeleteGame"
import "../../assets/css/buttons.css"
import "../../assets/css/pregame.css"
import { initGame, leaveGame } from "../../redux/actions";
import axios from 'axios';
import useInterval from '../../useInterval'

const Pregame = (props) => {
    const { isCreator, gameId, playerId, initGame, email, leaveGame } = props
    const [playersPregame, setPlayersPregame] = useState([])

    // Abandono de partida
    const leaveGameNotInit = async () => {
        await axios.put(
            'http://127.0.0.1:8000/game/' + gameId + '/leave_not_init_game',
            {
                email: email
            }
        ).then(response => {
            leaveGame({})
        }).catch(error => {
            console.log(error)
        });
    }

    // Jugadores que no son creadores
    const checkAndJoinGame = async () => {
        await axios(
            'http://127.0.0.1:8000/game/' + gameId + '/initialized?player_id=' + playerId
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
            } else if (response.data.game_state === "The game has been deleted") {
                alert("La partida ha sido eliminada por su creador")
                leaveGame({})
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
    }, 500)

    if (isCreator) {
        const callbackInitGame = async () => {
            /* Debería haber un chequeo al server para ver el número de jugadores
               Entonces debería traer el mínimo y máximo de jugadores de la partida
            */
            await axios.put(
                "http://127.0.0.1:8000/game/" + gameId + "/init?player_id=" + playerId
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
                    <ul>
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
                <DeleteGame callbackSubmit={leaveGameNotInit} />
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
                <LeaveGame callbackSubmit={leaveGameNotInit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isCreator: state.game.isCreator,
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        email: state.user.email
    };
}

const mapDispatchToProps = {
    initGame,
    leaveGame
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pregame);
