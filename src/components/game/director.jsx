import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/game.css'
import axios from 'axios';
import useInterval from '../../useInterval'
import { updateDirCandidate } from "../../redux/actions";

const Director = (props) => {
    const {actualMinister, actualDirector, gameId, playerId,
           dirCandidateInTurn, candidates} = props
    const [candidate, setCandidate] = useState(actualMinister);
    const [disabled, setDisabled] = useState(false);
    
    const setDirectorCandidate = async (option) => {
        axios.put('http://127.0.0.1:8000/game/'+gameId+
        '/select_director_candidate', {
            minister_id: playerId,
            director_id: option
        })
        setCandidate(option)
        setDisabled(true)
        updateDirCandidate({dirCandidateInTurn: option})
    }


    if (dirCandidateInTurn !== actualMinister) {
        return (
            <div className="director">
                <ul>
                    {candidates.map(option =>
                        <li>
                            <button
                                className="app-btn" disabled={disabled}
                                onClick={() => setDirectorCandidate(option)}
                            >
                                    {option}
                            </button>
                        </li>
                    )}                
                    <li> Director Candidato: {candidate} </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div> Candidato Elegido: {dirCandidateInTurn} </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        playerId: state.game.playerId,
        gameId: state.game.gameId,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector,
        dirCandidateInTurn: state.game.dirCandidateInTurn
    };
}

const mapDispatchToProps = {
    updateDirCandidate
};

export default connect(mapStateToProps, mapDispatchToProps)(Director);

