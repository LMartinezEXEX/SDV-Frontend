import React, {useState} from 'react'
import {connect} from 'react-redux'
import '../../assets/css/game.css'
import axios from 'axios'


const ChargesTable = (props) => {
    const {candidateMinister, candidateDirector,playersInfo, gameId} = props  //VER QUÉ HACER CON lumosVotes
    const [lumosVotes, setlumosVotes] = useState([])

    const voteResult = () => {
        axios.put('http://127.0.0.1:8000/game/'+gameId+'/result')
        .then(res =>{
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
    
    const charge = (player) => {
        if (player.player_id == candidateMinister) {
            return "Ministro"
        } else if (player.player_id == candidateDirector) {
            return "Director"
        } else {
            return ""
        }
    }

    const votationList = playersInfo.map(player => Object.assign({}, {username: player.username,
                                             vote: vote(player), charge: charge(player)}))

    
    return (
        <div className="chargeTable">
            <ul>
                {votationList.map(player => {
                    return (
                    <li key={player.username}>
                        {(player["is alive"])
                        ?(
                            <pre>
                                {player.username + " ".repeat(maxUsernameLength - player.username.length + 1) + "    " + player.vote}
                            </pre>
                        ):(
                            <pre className="deathPlayer">
                                {player.username}
                            </pre>
                        )
                        }
                    </li>)
                })}
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


export default connect(mapStateToProps, null)(ChargesTable);

