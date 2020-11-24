import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import useInterval from '../../useInterval';
import '../../assets/css/game.css';
import MortifagoBoard from './boards/mortifagoBoard';
import OrderBoard from './boards/orderBoard';
import RolsDisplayer from './RolsDisplayer';
import Envelope from './Envelope';
import SpellsList from './SpellsList';
import PopUp from './PopUp';
import Alert from '@material-ui/lab/Alert';
import { 
    Drawer, 
    Snackbar, Slide, 
    Dialog, DialogContent, DialogContentText, DialogTitle 
} from '@material-ui/core';
import {
    endGame, 
    updateGameState, getPlayersInfo, 
    getDirectorCandidates, getCandidates,
    rejectCandidates, rejectCandidatesNotified, enableSpell,
    reinitMessages, setMessageTopCenterOpen, setMessageTopCenter, 
    setMessageBottomLeftOpen, setMessageBottomLeft
} from '../../redux/actions';
import { getUsername } from './gameAuxiliars';
import {
    SERVER_URL, GAME_PATH, CHECK_GAME, 
    PLAYERS_INFO, DIRECTOR_CANDIDATES,
    GET_CANDIDATES, VOTE_RESULTS, 
    REJECT_NOTIFIED, END_GAME_NOTIFIED, 
    SELECT_MM, SPELL, PLAYER_ID_QUERY_STRING
} from '../constantsEndpoints';

const Game = (props) => {
    const { 
        gameId, finished, actualMinister, actualDirector, 
        cardsListMinister, cardsListDirector, 
        directorCandidates, didSelectDirectorCandidate, 
        didVoteCurrentTurn, voteNoxCurrentTurn, voteNoxNotified, 
        voteStartedCurrentTurn, voteDoneCurrentTurn, 
        ministerHasDiscardedCard, directorHasChosenCard, 
        fenix_promulgations, death_eater_promulgations, 
        playerId, enabledSpell, spell, amountPlayers, playerRole,
        playersInfo, 
        messageTopCenterOpen, messageSeverity, messageTopCenter,
        messageBottomLeftOpen, messageBottomLeft, 
        endGame, 
        updateGameState, getPlayersInfo, 
        getDirectorCandidates, getCandidates,
        rejectCandidates, rejectCandidatesNotified, enableSpell,
        reinitMessages, setMessageTopCenterOpen, setMessageTopCenter, 
        setMessageBottomLeftOpen, setMessageBottomLeft
    } = props

    // Al final del juego
    const [dialogEndGameOpen, setDialogEndGameOpen] = useState(false)
    const [dialogEndGameMessage, setDialogEndGameMessage] = useState("")

    const handleEndGame = (game_result) => {
        setDialogEndGameMessage(game_result)
        setDialogEndGameOpen(true)
    }

    const handleDialogEndGame = async () => {
        reinitMessages()
        endGame()
    }

    const handleSnackbarTopCenter = async () => {
        setMessageTopCenter({ messageSeverity: "", messageTopCenter: "" })
        setMessageTopCenterOpen({ messageTopCenterOpen: false })
    }

    const handleSnackbarBottomLeft = async () => {
        setMessageBottomLeft({ messageBottomLeft: "" })
        setMessageBottomLeftOpen({ messageBottomLeftOpen: false })
    }

    function SlideTransitionDown(props) {
        return <Slide {...props} direction="up" />;
    }
    
    const updatePlayers = async () => {
        await axios.get(
            SERVER_URL + GAME_PATH + gameId + PLAYERS_INFO
        ).then(response => {
            getPlayersInfo({ playersInfo: response.data["Players info"] })
        })
    }
    

    const handleDirectorCandidates = async () => {
        if (directorCandidates.length === 0) {
            await axios.get(
                SERVER_URL + GAME_PATH + gameId + DIRECTOR_CANDIDATES
            ).then(response => {
                if (response.status === 200) {
                    getDirectorCandidates({ 
                        directorCandidates: response.data["director candidates"] 
                    })
                }
            }).catch(error => {
                if (error.response && error.response.data["detail"] !== undefined) {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: error.response.data["detail"] 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                }
            })
        }
    }

    const handleCheckCandidates = async () => {
        await axios(
            SERVER_URL + GAME_PATH + gameId + GET_CANDIDATES
        ).then(response => {
            if (response.status === 200) {
                getCandidates({ 
                    candidateMinister: response.data.minister_id, 
                    candidateDirector: response.data.director_id 
                })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const changeMinister = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + SELECT_MM
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const spellsAvaliable = async () => {
        await axios.get(
            SERVER_URL + GAME_PATH + gameId + SPELL
        ).then(response => {
            if(response.data.Spell !== ""){
                setMessageTopCenter({ 
                    messageSeverity: "info", 
                    messageTopCenter: "Hay un hechizo disponible ¡Debes ejecutarlo!" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
                enableSpell({ enabledSpell: true, spell: response.data.Spell })
            }
        })
    }

    const onCloseSpellDrawer = () => {
        enableSpell({ enabledSpell: false })
        changeMinister()
    }

    const playerKnowsRejection = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + REJECT_NOTIFIED + PLAYER_ID_QUERY_STRING + playerId
        ).then(response => {
            if (response.status === 200 && response.data.notified) {
                console.log("Player knows about negative vote and has notified...")
                rejectCandidatesNotified({ voteNoxNotified: true })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const playerKnowsEndGame = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + END_GAME_NOTIFIED + PLAYER_ID_QUERY_STRING + playerId
        ).then(response => {
            if (response.status === 200 && response.data.game_result !== "") {
                handleEndGame(response.data.game_result)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
                console.log("Game has ended!")
            }
        })
    }

    const getVoteResults = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + VOTE_RESULTS
        ).then(response => {
            if (response.status === 200) {
                if (!response.data.result && !voteNoxCurrentTurn) {
                    // Se rechazaron los candidatos
                    rejectCandidates({ 
                        voteNoxCurrentTurn: true 
                    })
                } 
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const getGameState = async () => {
        await axios.get(
            SERVER_URL + GAME_PATH + gameId + CHECK_GAME
        ).then(response => {
            const data_check_game = response.data
            if (data_check_game["finished"]) {
                updateGameState({
                    actualMinister: data_check_game["current minister id"],
                    actualDirector: data_check_game["current director id"],
                    finished: data_check_game["finished"],
                    fenix_promulgations: data_check_game["fenix promulgations"],
                    death_eater_promulgations: data_check_game["death eater promulgations"],
                    voteStartedCurrentTurn: data_check_game["vote started"],
                    voteDoneCurrentTurn: data_check_game["vote done"]
                })
                console.log("Game should end soon...")
                playerKnowsEndGame(gameId, playerId, handleEndGame)
            } else {
                if (data_check_game["vote done"] && !voteDoneCurrentTurn) {
                    // Obtener resultados
                    getVoteResults(gameId, voteNoxCurrentTurn)
                } else if (data_check_game["vote started"] && !data_check_game["vote done"]) {
                    setMessageBottomLeft({
                        messageBottomLeft: "Votación en proceso..."
                    })
                    setMessageBottomLeftOpen({ 
                        messageBottomLeftOpen: true 
                    })
                } else if (!data_check_game["vote started"]) {
                    setMessageBottomLeft({
                        messageBottomLeft: "Se está eligiendo al candidato a director..."
                    })
                    setMessageBottomLeftOpen({ 
                        messageBottomLeftOpen: true 
                    })
                }
                if (data_check_game["vote done"] && playerId === data_check_game["current minister id"] && !enabledSpell) {
                    spellsAvaliable(gameId)
                }
                updateGameState({
                    actualMinister: data_check_game["current minister id"],
                    actualDirector: data_check_game["current director id"],
                    finished: data_check_game["finished"],
                    fenix_promulgations: data_check_game["fenix promulgations"],
                    death_eater_promulgations: data_check_game["death eater promulgations"],
                    voteStartedCurrentTurn: data_check_game["vote started"],
                    voteDoneCurrentTurn: data_check_game["vote done"]
                })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                console.log(error.response.data["detail"])
            }
        })
    }

    // Desplegar notificaciones de acuerdo al estado
    if (!finished) {
        if (voteDoneCurrentTurn && !voteNoxCurrentTurn && !voteNoxNotified) {
            if (playerId === actualMinister && cardsListMinister.length === 0 && !ministerHasDiscardedCard) {
                setMessageBottomLeft({
                    messageBottomLeft: "Puedes tomar nuevas cartas..."
                })
            } else if (playerId === actualMinister && cardsListMinister.length > 0 && !ministerHasDiscardedCard) {
                setMessageBottomLeft({
                    messageBottomLeft: "Debes descartar alguna de las cartas..."
                })
            } else if (playerId === actualMinister && ministerHasDiscardedCard && !enabledSpell) {
                setMessageBottomLeft({
                    messageBottomLeft: "El director puede promulgar..."
                })
            } else if (playerId === actualDirector && cardsListDirector.length === 0 && !directorHasChosenCard) {
                setMessageBottomLeft({
                    messageBottomLeft: "Esperando las cartas del ministro..."
                })
            } else if (playerId === actualDirector && cardsListDirector.length > 0 && !directorHasChosenCard) {
                setMessageBottomLeft({
                    messageBottomLeft: "Selecciona alguna carta para promulgar..."
                })
            } else if (playerId === actualDirector && directorHasChosenCard && !enabledSpell) {
                setMessageBottomLeft({
                        messageBottomLeft: "Nueva promulgación..."
                })
            } else if (playerId !== actualMinister && playerId !== actualDirector) {
                setMessageBottomLeft({
                    messageBottomLeft: "Candidatos elegidos: verificar los resultados y esperar al ejecutivo"
                })
            }
            setMessageBottomLeftOpen({ 
                messageBottomLeftOpen: true 
            })
        } else if (voteDoneCurrentTurn && voteNoxCurrentTurn && !voteNoxNotified) {
            setMessageBottomLeft({ 
                messageBottomLeft: "Candidatos rechazados: verificar los resultados" 
            })
            setMessageBottomLeftOpen({ 
                messageBottomLeftOpen: true 
            })
        } else if (voteDoneCurrentTurn && voteNoxCurrentTurn && voteNoxNotified) {
            setMessageBottomLeft({
                messageBottomLeft: "Candidatos rechazados: esperando chequeo de resultados por parte de los otros jugadores"
            })
            setMessageBottomLeftOpen({ 
                messageBottomLeftOpen: true 
            })
        }
    }
    
    // Actualizar lista de jugadores si no la tiene aún
    if (playersInfo.length === 0){
        updatePlayers()
    }

    useInterval(async () => {
        await updatePlayers()
        await getGameState()
    }, 2000)

    return(
        <div>
            <div className="left-view">
                <Envelope playerRole={playerRole}/>
                <div className="player-username">
                    {playersInfo.map(player => 
                        <div key={player.player_id} >{getUsername(player, playerId)}</div>
                    )}  
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
                        death_eater_promulgations={death_eater_promulgations} 
                        />
                    </div>
                    <div className="gameSection">
                        <OrderBoard 
                        fenix_promulgations= {fenix_promulgations} 
                        />
                    </div>
                    <div className="gameSection">
                        <div className="buttonSection">
                        {(voteDoneCurrentTurn)
                            ?(
                                <div>
                                    <PopUp 
                                    type="Resultados"  
                                    enableButton={voteDoneCurrentTurn}
                                    handleBeforeClose={(voteNoxCurrentTurn)?(playerKnowsRejection()):(undefined)}
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
                                    enableButton={voteDoneCurrentTurn && !ministerHasDiscardedCard && !directorHasChosenCard}  
                                    isOpenExtraCondition={!ministerHasDiscardedCard && !directorHasChosenCard}
                                    />
                                </div>
                            ):(<></>)
                            }
                            {(playerId === actualMinister && !didSelectDirectorCandidate)
                            ?(
                                <div >
                                    <PopUp 
                                    type="Elegir candidato a director"
                                    enableButton={!didSelectDirectorCandidate} 
                                    isOpenExtraCondition={!didSelectDirectorCandidate} 
                                    handleBeforeOpen={() => handleDirectorCandidates()} 
                                    candidates={directorCandidates} 
                                    />
                                </div>
                            ):(<></>)
                            }
                        </div>
                    </div>
                </div>
                <Dialog 
                open={dialogEndGameOpen} 
                onClose={()=> handleDialogEndGame()} 
                onExit={()=> handleDialogEndGame()} 
                autoHideDuration={20000} 
                TransitionComponent={SlideTransitionDown} 
                transitionDuration={{ enter: 1000, exit: 1000 }} 
                >
                    <DialogTitle 
                    id="end-game" 
                    style={{ backgroundColor: "#424242", color: "white" }} 
                    >
                    {"LA PARTIDA HA FINALIZADO"}
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: "#424242" }} >
                      <DialogContentText id="description" style={{ color: "white" }}>
                        {dialogEndGameMessage.toUpperCase()}
                      </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Snackbar 
                anchorOrigin={{ vertical: "top", horizontal: "center" }} 
                open={messageTopCenterOpen} 
                autoHideDuration={3000}
                onClose={() => handleSnackbarTopCenter()}
                onExit={() => handleSnackbarTopCenter()}
                >
                    <Alert variant="filled" severity={messageSeverity}>{messageTopCenter}</Alert>
                </Snackbar>
                <Snackbar 
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={messageBottomLeftOpen} 
                onClose={() => handleSnackbarBottomLeft()} 
                onExit={() => handleSnackbarBottomLeft()} 
                message={messageBottomLeft}
                />
                <Drawer className="Drawer" anchor='bottom' open={enabledSpell} 
                    onClose={() => onCloseSpellDrawer()}>
                        <SpellsList spell={spell}/>
                </Drawer>
            </div>    
    </div>);
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        finished: state.game.finished,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector,
        cardsListMinister: state.game.cardsListMinister,
        cardsListDirector: state.game.cardsListDirector,
        playerRole: state.game.playerRole,
        directorCandidates: state.game.directorCandidates,
        didSelectDirectorCandidate: state.game.didSelectDirectorCandidate,
        voteStartedCurrentTurn: state.game.voteStartedCurrentTurn,
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
        ministerHasDiscardedCard: state.game.ministerHasDiscardedCard,
        directorHasChosenCard: state.game.directorHasChosenCard,
        messageTopCenterOpen: state.notifications.messageTopCenterOpen,
        messageSeverity: state.notifications.messageSeverity,
        messageTopCenter: state.notifications.messageTopCenter,
        messageBottomLeftOpen: state.notifications.messageBottomLeftOpen,
        messageBottomLeft: state.notifications.messageBottomLeft
    };
}

const mapDispatchToProps = {
    endGame, 
    updateGameState, getPlayersInfo, 
    getDirectorCandidates, getCandidates,
    rejectCandidates, rejectCandidatesNotified, enableSpell,
    reinitMessages, setMessageTopCenterOpen, setMessageTopCenter, 
    setMessageBottomLeftOpen, setMessageBottomLeft
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
