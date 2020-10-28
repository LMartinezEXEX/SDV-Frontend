import React, {useState} from 'react'
import '../../assets/css/votation.css'
import axios from 'axios'

const Votation = () => {
    const [vote, setVote] = useState(false) 
    const [PlayerVoting, nextPlayer] = useState(2)
    const [votationOpen, enableVotation] = useState(true)
    const uploadVote = async (decition) => {
        setVote(decition)
        axios.put('http://127.0.0.1:8000/game/1/vote', {
            id: PlayerVoting,
            vote: vote
        })
        .then(res => {
            nextPlayer(PlayerVoting+1)
            if (PlayerVoting >= 5) {enableVotation(false)}
        });
    } 

    return (
        <div>
            <h3>Candidatos</h3>
            <ul>
                <li>Ministro: -</li>
                <li>Presidente: -</li>
                <li>Jugador Votando: {PlayerVoting}</li>
            </ul>
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(true)}}>
                <i class="far fa-thumbs-up fa-3x"></i></button>
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(false)}}>
                <i class="far fa-thumbs-down fa-3x"></i></button>
        </div>
    )
}

export default Votation
