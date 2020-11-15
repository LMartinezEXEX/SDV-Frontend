import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/game.css'
import axios from 'axios';

const Director = (props) => {
    const {actualMinister, actualDirector, gameId, playerId, candidates } = props
    
    const setDirectorCandidate = async (option) => {
        await axios.put(
            'http://127.0.0.1:8000/game/' + gameId + '/select_director_candidate',
            {
                minister_id: playerId,
                director_id: option
            }
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data != undefined) {
                console.log(error.response.data)
            }
        })
    }


    if (actualMinister === actualDirector) {
        return (
            <div className="director">
                <ul>
                    {
                        candidates.map(option =>
                            <li>
                                <button
                                    className="small-btn"
                                    onClick={() => setDirectorCandidate(option)}
                                >
                                        {option}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <div> Elegido: {actualDirector} </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        playerId: state.game.playerId,
        gameId: state.game.gameId,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector
    };
}

export default connect(mapStateToProps)(Director);