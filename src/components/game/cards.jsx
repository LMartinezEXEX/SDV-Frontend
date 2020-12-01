import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import proclamationM from '../../assets/images/boards/m-proclamation.jpg';
import proclamationO from '../../assets/images/boards/o-proclamation.jpg';
import '../../assets/css/cards.css';
import {  
    ministerDiscardedCard, directorChoseCard, 
    setMessageTopCenterOpen, setMessageTopCenter,
} from '../../redux/actions';
import { 
    SERVER_URL, GAME_PATH,
    PROMULGATE_CARD, DISCARD_CARD, 
    SELECT_MM, SPELL, DIRECTOR_EXPELLIARMUS,
    DIRECTOR_ID_QUERY
} from '../constantsEndpoints';
import { errorTranslate } from '../errorTranslate';

const Cards = (props) => {
    const { 
        gameId, playerId, actualMinister, actualDirector, 
        cardsListMinister, cardsListDirector,   
        setIsOpen,  
        ministerDiscardedCard, directorChoseCard, 
        setMessageTopCenterOpen, setMessageTopCenter,
        death_eater_promulgations, expelliarmus
    } = props

    const changeMinister = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + SELECT_MM
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined && death_eater_promulgations <= 5) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const spellsAvailableDirectorCheck = async () => {
        await axios(
            SERVER_URL + GAME_PATH + gameId + SPELL
        ).then(response => {
            if (response.status === 200 && response.data.Spell === ""){
                changeMinister()
                setIsOpen(false)        
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined && death_eater_promulgations <= 5) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const discardCard = async (card) => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + DISCARD_CARD,
            {
                player_id: playerId, 
                to_discard: card
            }
        ).then(response => {
            if (response.status === 200 && response.data["message"] !== undefined) {            
                console.log("Director will get cards...")
                if (response.data["message"] === "Card discarded") {
                    ministerDiscardedCard({ ministerHasDiscardedCard: true })
                    setMessageTopCenter({ 
                        messageSeverity: "success", 
                        messageTopCenter: "Carta descartada" 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                }  
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }
    
    const chooseCardForBoard = async (card) => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + PROMULGATE_CARD,
            {
                player_id: playerId,
                to_promulgate: card
            }
        ).then(response => {
            if (response.status === 200) {
                directorChoseCard({ directorHasChosenCard: true })
                setMessageTopCenter({ 
                    messageSeverity: "success", 
                    messageTopCenter: "Carta promulgada" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
                spellsAvailableDirectorCheck(gameId)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined && death_eater_promulgations < 5) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const executeExpelliarmus = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + DIRECTOR_EXPELLIARMUS 
            + DIRECTOR_ID_QUERY + actualDirector 
        ).then(response => {
            if (response.status === 200) {
                setIsOpen(false)
            }
        })
    }

    const handleOnClick = (card) => {
        if (playerId === actualMinister) {
            discardCard(card)
        } else if (playerId === actualDirector) {
            chooseCardForBoard(card)
        }
        setIsOpen(false)
    }

    const showCard = (card) => {
        switch(card){
            case 1: {
                return (
                    <button onClick={() => handleOnClick(card)}>
                        <img src={proclamationM} alt="Opcion de proclamacion"></img>
                    </button>
                )
            }
            case 0: {
                return (
                    <button onClick={() => handleOnClick(card)}>
                        <img src={proclamationO} alt="Opcion de proclamacion"></img>
                    </button>
                )
            }
            default: {
                return <div></div>
            }
        }
    }
    
    if (playerId === actualMinister) {
        if (cardsListMinister.length === 0) {
            return (
                <div>
                    <div className="cardsDisplayer">
                        <div> Aún no hay cartas disponibles </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div style={{ textAlign: "center" }}>Descartar alguna</div>
                <div className="cardsDisplayer">
                    <div>{showCard(cardsListMinister[0])}</div>
                    <div>{showCard(cardsListMinister[1])}</div>
                    <div>{showCard(cardsListMinister[2])}</div>
                </div>
            </div>
        )
    } else if (playerId === actualDirector) {
        if (cardsListDirector.length === 0) {
            return (
                <div>
                    <div className="cardsDisplayer">
                        <div> Aún no hay cartas disponibles </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div style={{ textAlign: "center" }}>Elegir proclamación</div>
                <div className="cardsDisplayer">
                    <div>{showCard(cardsListDirector[0])}</div>
                    <div>{showCard(cardsListDirector[1])}</div>
                </div>
                    {(death_eater_promulgations >= 5 && !expelliarmus)
                    ?(
                        <button className="app-btn SpellLikeCard" onClick={() => executeExpelliarmus()}>
                            Expelliarmus
                        </button>
                    ):(
                        <></>
                    )
                    }
            </div>
        )
    } else {
        return(
            <></>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector,
        cardsListMinister: state.game.cardsListMinister,
        cardsListDirector: state.game.cardsListDirector,
        death_eater_promulgations: state.game.death_eater_promulgations,
        expelliarmus: state.game.expelliarmus
    };
}

const mapDispatchToProps = { 
    ministerDiscardedCard, directorChoseCard, 
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Cards);