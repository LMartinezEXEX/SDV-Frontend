import React, {useState} from 'react'
import {connect} from 'react-redux'
import '../../assets/css/votation.css'
import axios from 'axios'

const Votation = (props) => {
    const {gameId, playerId} = props
    const [vote, setVote] = useState(false) 
    const [votationOpen, enableVotation] = useState(true)
    // const players = ['Harry54', 'Hermione21', 'Hagrid666', 'Draco55', 'Ron12']

    // const changeMinister = async () => {
    //     await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
    //     .then(res => {
    //         gameUpdater()
    //     })
    // }

    // const voteResult = () => {
    //     axios.put('http://127.0.0.1:8000/game/'+gameState.gameId+'/result')
    //     .then(res =>{
    //         if(res.data.result){alert("Ministro aceptado")}
    //         else {
    //             alert("Ministro rechazado")
    //             changeMinister()
    //             nextPlayer(1)
    //             enableVotation(true) 
    //         }
    //     })
    // }

    const uploadVote = async (decition) => {
        setVote(decition)
        axios.put('http://127.0.0.1:8000/game/'+gameId+'/vote', {
            id: playerId,
            vote: decition
        })
    } 

    return (
        <div>
            {/* <h3>Candidatos</h3>
            <ul>
                <li>Ministro: {players[(gameState.current_minister_id-(5*(gameState.gameId-1))-1)]}</li>
                <li>Presidente: -</li>
                <li>Jugador Votando: {players[PlayerVoting-(5*(gameState.gameId-1))-1]}</li>
            </ul> */}
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(true)}}>
                <i class="far fa-thumbs-up fa-3x"></i></button>
            <button className="votationButton" disabled={!votationOpen} onClick={() => {uploadVote(false)}}>
                <i class="far fa-thumbs-down fa-3x"></i></button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playerId: state.game.playerId,
        gameId: state.game.gameId,
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Votation);
