import React from 'react'
import {connect} from 'react-redux'
import '../../assets/css/votation.css'
import axios from 'axios'
import { voteCurrentTurn } from "../../redux/actions"

const Votation = (props) => {
    const { gameId, playerId, voteCurrentTurn } = props

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
            if (error.response && error.response.data) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    } 

    return (
        <div>
            <button className="votationButton" onClick={() => {uploadVote(true)}}>
                <i class="far fa-thumbs-up fa-3x"></i>
            </button>
            <button className="votationButton" onClick={() => {uploadVote(false)}}>
                <i class="far fa-thumbs-down fa-3x"></i>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playerId: state.game.playerId,
        gameId: state.game.gameId
    };
}

const mapDispatchToProps = {
    voteCurrentTurn
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Votation);