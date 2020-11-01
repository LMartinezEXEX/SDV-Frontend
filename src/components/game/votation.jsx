import React, {useState} from 'react'
import '../../assets/css/votation.css'
import axios from 'axios'

const Votation = (props) => {
    const {gameState, gameUpdater} = props
    const [vote, setVote] = useState(false) 
    /*this equation down here give me the first id to vote*/ 
    const [PlayerVoting, nextPlayer] = useState(5*(gameState.gameId-1)+1) 
    const [votationOpen, enableVotation] = useState(true)
    const players = ['Harry54', 'Hermione21', 'Hagrid666', 'Draco55', 'Ron12']

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
        .then(res => {
            gameUpdater()
        })
    }

    const voteResult = () => {
        axios.put('http://127.0.0.1:8000/game/'+gameState.gameId+'/result')
        .then(res =>{
            if(res.data.result){alert("Ministro aceptado")}
            else {
                alert("Ministro rechazado")
                changeMinister()
                nextPlayer(1)
                enableVotation(true) 
            }
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
                <li>Ministro: {players[(gameState.current_minister_id-(5*(gameState.gameId-1))-1)]}</li>
                <li>Presidente: -</li>
                <li>Jugador Votando: {players[PlayerVoting-(5*(gameState.gameId-1))-1]}</li>
            </ul>
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(true)}}>
                <i class="far fa-thumbs-up fa-3x"></i></button>
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(false)}}>
                <i class="far fa-thumbs-down fa-3x"></i></button>
        </div>
    )
}

export default Votation
