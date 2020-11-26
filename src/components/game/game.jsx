import React from 'react'
import axios from 'axios'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import Envelope from './Envelope'
import PopUp from './PopUp'
import { 
    endGame, updateGameState, enableSpell, 
    getPlayersInfo, getDirectorCandidates, 
    getCandidates, rejectCandidates, 
    rejectCandidatesNotified 
} from "../../redux/actions";
import { connect } from 'react-redux';
import useInterval from '../../useInterval'
import Drawer from '@material-ui/core/Drawer';
import SpellsList from './SpellsList'
import Modal from '../Modal'
import RolsDisplayer from './RolsDisplayer'
import { useState } from 'react'
import { wait } from '@testing-library/react';

const Game = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const { gameId, actualMinister, actualDirector, candidateMinister, candidateDirector, 
            getDirectorCandidates, directorCandidates, voteDoneCurrentTurn, 
            didVoteCurrentTurn, voteNoxCurrentTurn, 
            rejectCandidates, rejectCandidatesNotified, 
            getCandidates, fenix_promulgations, death_eater_promulgations, updateGameState,
            playerId, enabledSpell, enableSpell, spell, amountPlayers, playerRole,
            playersInfo, getPlayersInfo, endGame , expelliarmus, ministerConsent} = props
    
    const updatePlayers = async() =>{
        await axios.get("http://127.0.0.1:8000/game/"+gameId+"/players_info")
            .then(res=>{
                getPlayersInfo({playersInfo:res.data["Players info"]})
            })
    }
    
    if (playersInfo.length === 0){
        updatePlayers()
    }

    const handleDirectorCandidates = async () => {
        setIsOpen(true)
        if (directorCandidates.length === 0) {
            await axios.get(
                "http://127.0.0.1:8000/game/" + gameId + "/director_candidates"
            ).then(response => {
                if (response.status === 200) {
                    getDirectorCandidates({ directorCandidates: response.data["director candidates"] })
                }
            }).catch(error => {
                if (error.response != undefined && error.response.data != undefined) {
                    console.log(error.response.data)
                }
            })
        }
    }

    const handleCheckCandidates = async () => {
        await axios(
            "http://127.0.0.1:8000/game/" + gameId + "/get_candidates"
        ).then(response => {
            if (response.status === 200) {
                getCandidates({ candidateMinister: response.data.minister_id, candidateDirector: response.data.director_id })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data != undefined) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    }

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/select_MM")
        .then(res => {
        })
    }

    const spellsAvaliable = async() => {
        const spellsAvaliable_url = "http://127.0.0.1:8000/game/"
        await axios.get(spellsAvaliable_url + gameId + '/spell'
        ).then(res => {
            if(res.data.Spell != "" && playerId === actualMinister){
                enableSpell({enabledSpell:true, spell:res.data.Spell})
            }
        })
    }
    
    const playerKnowsRejection = async () => {
        await axios.put(
            "http://127.0.0.1:8000/game/" + gameId + "/reject_notified?player_id=" + playerId
        ).then(response => {
            if (response.status === 200 && response.data.notified) {
                console.log("Player knows about negative vote and has notified...")
            }
        }).catch(error => {
            if (error.response !== undefined && error.response.data !== undefined) {
                if (error.response.data["detail"] !== undefined) {
                    console.log(error.response.data["detail"])
                }
            }
        })
    }

    const getGameState = async () => {
        await axios.get(
            "http://127.0.0.1:8000/game/"+gameId+"/check_game"
        ).then(res => {
            var data = res.data

            if (data["vote done"] && !voteNoxCurrentTurn) {
                // Obtener resultados
                axios.put(
                    'http://127.0.0.1:8000/game/'+gameId+'/result'
                ).then(response =>{
                    if (response.status === 200) {
                        if (!response.data.result) {
                            // Se rechazaron los candidatos
                            console.log("Rejected candidates -> should change state")
                            rejectCandidates({ voteNoxCurrentTurn: true })
                        }
                    }
                }).catch(error => {
                    if (error.response !== undefined && error.response.data !== undefined) {
                        if (error.response.data["detail"] !== undefined) {
                            console.log(error.response.data["detail"])
                        }
                    }
                })
            }

            if(data["finished"] && data["death eater promulgations"] === 6) {
                alert("GANARON LOS MORTIFAGOS")
            } else if (data["finished"] && data["fenix promulgations"] === 5) {
                alert("GANO LA ORDEN DEL FENIX")
            } else if (data["finished"]) {
                alert("JUEGO FINALIZADO")
            }

            updateGameState({
                actualMinister: data["current minister id"],
                actualDirector: data["current director id"],
                finished: data["finished"],
                fenix_promulgations: data["fenix promulgations"],
                death_eater_promulgations: data["death eater promulgations"],
                voteDoneCurrentTurn: data["vote done"],
                expelliarmus: data["expelliarmus"],
                ministerConsent: data["minister consent"]
            })
        }).catch(error => {
            if (error.response !== undefined && error.response.data !== undefined) {
                console.log(JSON.stringify(error.response.data))
                if (error.response.data["detail"] !== undefined) {
                    alert(error.response.data["detail"])
                    endGame()
                }
            }
        })
    }

    const getUsername = (player) => {
        if (player.player_id == playerId) {
            return player.username
        }
    }

    useInterval(async () => {
        console.log("Checking...")
        await spellsAvaliable()
        await getGameState()
    }, 2000)

    useInterval(async () => {
        await updatePlayers()
    }, 5000)

    return(
        <div>
            <div className="left-view">
                <Envelope playerRole={playerRole}/>
                <div className="player-username">
                    {playersInfo.map(player => <div>{getUsername(player)}</div>)}    
                </div>
                <div>
                    <RolsDisplayer/>
                </div>
            </div>
            <div className="gameView">
                <div className="gameBox">
                    <div className="gameSection">
                        <MortifagoBoard 
                            amountPlayers={amountPlayers}
                            death_eater_promulgations= {death_eater_promulgations}/>
                    </div>
                    <div className="gameSection">
                        {(isPlayerAliveFromList(playersInfo, playerId))?
                        (<div className="buttonSection">
                            {(voteDoneCurrentTurn)
                            ?(
                                <div>
                                    <PopUp 
                                    type="Resultado electoral"  
                                    enableButton={voteDoneCurrentTurn}
                                    handleBeforeClose={(voteNoxCurrentTurn)?(() => playerKnowsRejection()):(undefined)}
                                    />
                                </div>
                            ):(<></>)
                            }
                            {(voteStartedCurrentTurn && !voteDoneCurrentTurn && !didVoteCurrentTurn)
                            ?(
                                <div>
                                    <PopUp 
                                    type="Votar" 
                                    enableButton={!didVoteCurrentTurn} 
                                    isOpenExtraCondition={!didVoteCurrentTurn}
                                    handleBeforeOpen={() => handleCheckCandidates()} 
                                    />
                                </div>
                            ):(<></>)
                            }
                            {(voteDoneCurrentTurn && !voteNoxCurrentTurn 
                            && !ministerHasDiscardedCard && !directorHasChosenCard 
                            && (playerId === actualMinister || playerId === actualDirector))
                            ?(
                                <div>
                                    <PopUp 
                                    type="Cartas"
                                    enableButton={actualMinister != actualDirector} 
                                    />
                                </div>
                            ):(<></>)
                            }
                            {(playerId === actualMinister && candidateMinister === candidateDirector)
                            ?(
                                <div >
                                <button
                                    className="app-btn" id="gameButton"
                                    onClick={() => { handleDirectorCandidates() }}
                                >
                                    Elegir Director
                                </button>
                                <Modal
                                    open={isOpen && candidateDirector === 0} setIsOpen={setIsOpen}
                                    children={"Director"} candidates={directorCandidates}
                                    onClose={() => setIsOpen(false)}
                                />
                                </div>
                            ):(<></>)
                            }
                        </div>
                    </div>
                    <div className="gameSection">
                        <OrderBoard
                            fenix_promulgations= {fenix_promulgations}/>
                    </div>
                </div>
                <Drawer className="Drawer" anchor='bottom' 
                open={(enabledSpell || expelliarmus) && actualMinister===playerId} 
                    onClose={()=>{enableSpell({enabledSpell:false}); changeMinister()}}>
                        <SpellsList spell={spell} enableExpelliarmus={expelliarmus}/>
                </Drawer>
            </div>    
    </div>);
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId:state.game.playerId,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector,
        candidateMinister: state.game.candidateMinister,
        candidateDirector: state.game.candidateDirector,
        playerRole: state.game.playerRole,
        directorCandidates: state.game.directorCandidates,
        voteDoneCurrentTurn: state.game.voteDoneCurrentTurn,
        didVoteCurrentTurn: state.game.didVoteCurrentTurn,
        voteNoxCurrentTurn: state.game.voteNoxCurrentTurn,
        voteNoxNotified: state.game.voteNoxNotified,
        fenix_promulgations: state.game.fenix_promulgations,
        death_eater_promulgations: state.game.death_eater_promulgations,
        enabledSpell: state.game.enabledSpell,
        spell: state.game.spell,
        amountPlayers: state.game.amountPlayers,
        playersInfo: state.game.playersInfo,
        expelliarmus: state.game.expelliarmus,
        ministerConsent: state.game.ministerConsent
    };
}

const mapDispatchToProps = {
    endGame,
    updateGameState,
    enableSpell,
    getPlayersInfo,
    getDirectorCandidates,
    getCandidates,
    rejectCandidates, 
    rejectCandidatesNotified
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
