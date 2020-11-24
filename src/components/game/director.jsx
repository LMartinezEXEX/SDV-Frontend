import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../assets/css/game.css';
import { 
    selectDirectorCandidate, 
    setMessageTopCenter, setMessageTopCenterOpen 
} from '../../redux/actions';
import { getUsernameFromList } from './gameAuxiliars';
import { SERVER_URL, GAME_PATH, SELECT_DIRECTOR_CANDIDATE } from '../constantsEndpoints';

const Director = (props) => {
    const { 
        gameId, playerId, candidates, playersInfo, onSelect, 
        selectDirectorCandidate, 
        setMessageTopCenter, setMessageTopCenterOpen
    } = props

    const setDirectorCandidate = async (option) => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + SELECT_DIRECTOR_CANDIDATE,
            {
                minister_id: playerId,
                director_id: option
            }
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                selectDirectorCandidate({
                    didSelectDirectorCandidate: (response.data["candidate director id"] !== undefined)
                })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: error.response.data["detail"] })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
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
                                    {getUsernameFromList(playersInfo, option)}
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
    selectDirectorCandidate, 
    setMessageTopCenter, setMessageTopCenterOpen
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Director);