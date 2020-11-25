import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../assets/css/game.css';
import { SERVER_URL, GAME_PATH, VOTE_RESULTS } from '../constantsEndpoints';

const ChargesTable = (props) => {
    const {playersInfo, gameId} = props  
    const [lumosVotes, setlumosVotes] = useState([])

    const voteResult = () => {
        axios.put(
            SERVER_URL + GAME_PATH + gameId + VOTE_RESULTS
        ).then(res =>{
            setlumosVotes(res.data.voted_lumos)
        })
    }
    
    if(lumosVotes.length === 0) {
        voteResult()
    }
    
    const vote = (player) => {
        if(lumosVotes.length !== 0) {
            if(lumosVotes.includes(player.player_id)) {
                return "Lumos"
            } else {
                return "Nox"
            }
        } else return ""
    }
    
    const votationList = playersInfo.map(player => Object.assign({}, {username: player.username,
                                             vote: vote(player)}))

    
    return (
        <div className="chargeTable">
            <ul>
                {votationList.map(player => <li key={player.username}>
                    {player.username + " " + player.vote}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        candidateMinister: state.game.candidateMinister,
        candidateDirector: state.game.candidateDirector,
        playersInfo: state.game.playersInfo,
        gameId: state.game.gameId
    };
}


export default connect(mapStateToProps)(ChargesTable);

