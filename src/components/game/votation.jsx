import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../../assets/css/votation.css';
import { voteCurrentTurn, setMessageTopCenterOpen, setMessageTopCenter } from '../../redux/actions';
import { getUsernameFromList } from './gameAuxiliars';
import { SERVER_URL, GAME_PATH, VOTE } from '../constantsEndpoints';
import errorTranslate from '../errorTranslate';

const Votation = (props) => {
    const { 
        gameId, playerId, 
        candidateMinister, candidateDirector, 
        playersInfo, onSelect,
        voteCurrentTurn, 
        setMessageTopCenterOpen, setMessageTopCenter 
    } = props

    const uploadVote = async (vote) => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + VOTE,
            {
                id: playerId,
                vote: vote
            }
        ).then(response => {
            if (response.status === 200 && response.data.votes) {
                voteCurrentTurn({ didVoteCurrentTurn: true })
                setMessageTopCenter({ messageSeverity: "success", messageTopCenter: "Voto " + (vote?"Lumos":"Nox") + " enviado" })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    if (candidateMinister !== candidateDirector) {
        return (
            <div>
                <ul key="candidates">
                    <li>Candidato Ministro: {getUsernameFromList(playersInfo, candidateMinister)} </li>
                    <li>Candidato Director: {getUsernameFromList(playersInfo, candidateDirector)} </li>
                </ul>
                <div className="buttonSection">
                <button className="votationButton-lumos" onClick={() => { uploadVote(true); onSelect() }}>
                </button>
                <button className="votationButton-nox" onClick={() => { uploadVote(false); onSelect() }}>
                </button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <ul key="candidates">
                    <li>Candidato Ministro: {getUsernameFromList(playersInfo, candidateMinister)} </li>
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
    voteCurrentTurn, 
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Votation);