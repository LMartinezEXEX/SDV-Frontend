import React from 'react'
import { connect } from 'react-redux'
import '../../assets/css/game.css'
import axios from 'axios';
import { selectDirectorCandidate } from '../../redux/actions'

const Director = (props) => {
    const { gameId, playerId, candidates, playersInfo, selectDirectorCandidate, onSelect } = props
    
    const setDirectorCandidate = async (option) => {
        await axios.put(
            'http://127.0.0.1:8000/game/' + gameId + '/select_director_candidate',
            {
                minister_id: playerId,
                director_id: option
            }
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                selectDirectorCandidate({
                    didSelectDirectorCandidate: (response.data["candidate director id"] != undefined)
                })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data != undefined) {
                console.log(error.response.data)
            }
        })
    }

    const getUsernameCandidate = (directorCandidate) =>{
        let response = ""
        playersInfo.forEach(player =>{
            if(player.player_id === directorCandidate){
                response = player.username
            }
        })
        return response
    }  

    return (
        <div className="director">
            <ul>
                {
                    candidates.map(option =>
                        <li key={option}>
                            <button
                                className="buttonTaker"
                                onClick={() => { setDirectorCandidate(option); onSelect() } }
                            >
                                    {getUsernameCandidate(option)}
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playerId: state.game.playerId,
        gameId: state.game.gameId,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    selectDirectorCandidate
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Director);