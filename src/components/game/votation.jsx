import React from 'react'
import {connect} from 'react-redux'
import '../../assets/css/votation.css'
import axios from 'axios'
import { voteCurrentTurn } from "../../redux/actions"

const Votation = (props) => {
    const { gameId, playerId, actualMinister, candidateMinister, candidateDirector, voteCurrentTurn } = props

    const uploadVote = async (vote) => {
        await axios.put(
            'http://127.0.0.1:8000/game/' + gameId + '/vote',
            {
                id: playerId,
                vote: vote
            }
        ).then(response => {
            console.log(response.data)
            if (response.data.votes) {
                voteCurrentTurn({ didVoteCurrentTurn: true })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data != undefined) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    }

    if (candidateMinister != candidateDirector) {
        return (
            <div>
                <ul>
                    <li>Candidato Ministro: {candidateMinister} </li>
                    <li>Candidato Director: {candidateDirector} </li>
                </ul>
                <button className="votationButton" onClick={() => {uploadVote(true)}}>
                    <i class="far fa-thumbs-up fa-3x"></i>
                </button>
                <button className="votationButton" onClick={() => {uploadVote(false)}}>
                    <i class="far fa-thumbs-down fa-3x"></i>
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    <li>Candidato Ministro: {actualMinister} </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        actualMinister: state.game.actualMinister,
        candidateMinister: state.game.candidateMinister,
        candidateDirector: state.game.candidateDirector
    };
}

const mapDispatchToProps = {
    voteCurrentTurn
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Votation);