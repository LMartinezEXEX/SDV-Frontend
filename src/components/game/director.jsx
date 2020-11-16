import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/game.css'
import axios from 'axios';
import { getCandidates } from '../../redux/actions'

const Director = (props) => {
    const {actualMinister, actualDirector, gameId, playerId, candidates,
        getCandidates, playersInfo } = props
    
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

    const handleCheckCandidates = async () => {
        await axios(
            "http://127.0.0.1:8000/game/" + gameId + "/get_candidates"
        ).then(response => {
            if (response.status === 200) {
                getCandidates({ candidateMinister: response.data.minister_id, candidateDirector: response.data.director_id })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data != undefined) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    }

    const getUsernameCandidate = (directorCandidate) =>{
        let response = ""
        playersInfo.forEach(player =>{
            if(player.player_id === directorCandidate){
                response = player.username
            }
        })
        return response
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
                                    onClick={() => { setDirectorCandidate(option); handleCheckCandidates() } }
                                >
                                        {getUsernameCandidate(option)}
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
        actualDirector: state.game.actualDirector,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    getCandidates
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Director);