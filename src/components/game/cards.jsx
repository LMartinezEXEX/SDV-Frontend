import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import proclamationM from '../../assets/images/boards/m-proclamation.jpg';
import proclamationO from '../../assets/images/boards/o-proclamation.jpg';
import '../../assets/css/cards.css';
import { 
    getMinisterCards, getDirectorCards, 
    ministerDiscardedCard, directorChoseCard, 
    setMessageTopCenterOpen, setMessageTopCenter
} from '../../redux/actions';
import { 
    SERVER_URL, GAME_PATH,
    GET_MINISTER_CARDS, GET_DIRECTOR_CARDS, PROMULGATE_CARD, DISCARD_CARD, 
    SELECT_MM, SPELL, PLAYER_ID_QUERY_STRING
} from '../constantsEndpoints';
import errorTranslate from '../errorTranslate';

const Cards = (props) => {
    const { 
        gameId, playerId, actualMinister, actualDirector, 
        cardsListMinister, cardsListDirector,   
        setIsOpen, 
        getMinisterCards, getDirectorCards, 
        ministerDiscardedCard, directorChoseCard, 
        setMessageTopCenterOpen, setMessageTopCenter
    } = props

    const checkMinisterCards = async () => {
        await axios(
            SERVER_URL + GAME_PATH + gameId + GET_MINISTER_CARDS + PLAYER_ID_QUERY_STRING + playerId
        ).then(response => {
            if (response.status === 200) {
                getMinisterCards({ cardsListMinister: response.data["cards"] })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const checkDirectorCards = async () => {
        await axios(
            SERVER_URL + GAME_PATH + gameId + GET_DIRECTOR_CARDS + PLAYER_ID_QUERY_STRING + playerId
        ).then(response => {
            if (response.status === 200) {
                getDirectorCards({ cardsListDirector: response.data["cards"] })
            }
        }).catch(error => {
            if (error.response && error.response.data !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
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
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
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
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
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
                    setMessageTopCenter({ messageSeverity: "success", messageTopCenter: "Carta descartada" })
                    
                }  else {
                    setMessageTopCenter({ messageSeverity: "info", messageTopCenter: "Carta descartada" })
                }
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
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
                setMessageTopCenter({ messageSeverity: "success", messageTopCenter: "Carta promulgada" })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
                spellsAvailableDirectorCheck(gameId)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const handleOnClick = (card) => {
        if (playerId === actualMinister) {
            // Descartar carta, si el jugador es el ministro
            discardCard(card)
        } else if (playerId === actualDirector) {
            // Promulgar (y descartar la otra carta), si el jugador es el director
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
            checkMinisterCards(gameId, playerId)
        }

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
            checkDirectorCards(gameId, playerId)
        }

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
                    <div>{showCard(cardsListDirector[1])}</div>)        
                </div>
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
        cardsListDirector: state.game.cardsListDirector
    };
}

const mapDispatchToProps = { 
    getMinisterCards, getDirectorCards, 
    ministerDiscardedCard, directorChoseCard, 
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Cards);