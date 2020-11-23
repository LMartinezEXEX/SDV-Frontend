import React from 'react'
import {connect} from 'react-redux'
import '../../assets/css/votation.css'
import axios from 'axios'
import { voteCurrentTurn } from "../../redux/actions"

const Votation = (props) => {
    const { gameId, playerId, candidateMinister,
        candidateDirector, voteCurrentTurn, playersInfo, onSelect } = props

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

    const getUsernameMinister = () =>{
        let response = "" 
        playersInfo.forEach(player =>{
            if(player.player_id === candidateMinister){
                response =player.username
            }
        })
        return response
    }

    const getUsernameDirector = () =>{
        let response = ""
        playersInfo.forEach(player =>{
            if(player.player_id === candidateDirector){
                response = player.username
            }
        })
        return response
    }  

    if (candidateMinister != candidateDirector) {
        return (
            <div>
                <ul>
                    <li>Candidato Ministro: {getUsernameMinister()} </li>
                    <li>Candidato Director: {getUsernameDirector()} </li>
                </ul>
                <div className= "votation-buttons">
                    <button className="votationButton-lumos" onClick={() => {uploadVote(true)}}></button>
                    <button className="votationButton-nox" onClick={() => {uploadVote(false)}}> </button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    <li>Candidato Ministro: {getUsernameMinister()} </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        candidateMinister: state.game.candidateMinister,
        candidateDirector: state.game.candidateDirector,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    voteCurrentTurn
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Votation);