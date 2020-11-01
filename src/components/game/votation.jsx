import React, {useState} from 'react'
import '../../assets/css/votation.css'
import axios from 'axios'

const Votation = ({gameState}) => {
    const [vote, setVote] = useState(false) 
    /*this equation down here give me the first id to vote*/ 
    const [PlayerVoting, nextPlayer] = useState(5*(gameState.gameId-1)+1) 
    const [votationOpen, enableVotation] = useState(true)
    
    const voteResult = () => {
        axios.put('http://127.0.0.1:8000/game/'+gameState.gameId+'/result')
        .then(res =>{
            alert(res)
            if(res.result){alert("Ministro aceptado")}
            else {alert("Ministro rechazado")}
        })
    }

    const uploadVote = async (decition) => {
        setVote(decition)
        axios.put('http://127.0.0.1:8000/game/'+gameState.gameId+'/vote', {
            id: PlayerVoting,
            vote: vote
        })
        .then(res => {
            if (PlayerVoting >= gameState.gameId*5) {
                enableVotation(false) 
                voteResult()
            }else{
                nextPlayer(PlayerVoting+1)
            } 
        });
    } 

    return (
        <div>
            <h3>Candidatos</h3>
            <ul>
                <li>Ministro: {gameState.current_minister_id}</li>
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
