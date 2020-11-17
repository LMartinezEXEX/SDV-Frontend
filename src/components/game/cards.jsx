import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import proclamationM from '../../assets/images/boards/m-proclamation.jpg'
import proclamationO from '../../assets/images/boards/o-proclamation.jpg'
import '../../assets/css/cards.css';
import { getMinisterCards, getDirectorCards, ministerDiscardedCard, directorChoseCard } from "../../redux/actions"

const Cards = (props) => {
    const { gameId, playerId, actualMinister, actualDirector, 
        cardsListMinister, cardsListDirector, getMinisterCards, getDirectorCards, 
        ministerDiscardedCard, directorChoseCard, 
        setIsOpen } = props;

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/select_MM")
        .then(res => {
        })
    }
    
    const checkMinisterCards = async () => {
        await axios(
            "http://127.0.0.1:8000/game/" + gameId + "/minister_cards?player_id=" + actualMinister
        ).then(response => {
            if (response.status === 200) {
                getMinisterCards({ cardsListMinister: response.data["cards"] })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    }

    const checkDirectorCards = async () => {
        await axios(
            "http://127.0.0.1:8000/game/" + gameId + "/director_cards?player_id=" + actualDirector
        ).then(response => {
            if (response.status === 200) {
                getDirectorCards({ cardsListDirector: response.data["cards"] })
            }
        }).catch(error => {
            if (error.response != undefined && error.response.data) {
                console.log(JSON.stringify(error.response.data))
            }
        })
    }

    const chooseCardForBoard = async (card) => {
        await axios.put(
            "http://127.0.0.1:8000/game/" + gameId + "/promulgate",
            {
                player_id: actualDirector,
                to_promulgate: card
            }
        ).then(response => {
            if (response.status === 200) {
                directorChoseCard({ directorHasChosenCard: true });
                (async () => {
                    await axios(
                        "http://127.0.0.1:8000/game/" + gameId + "/spell"
                    ).then(response => {
                        if (response.status === 200 && response.data.Spell == ""){
                            changeMinister()
                            setIsOpen(false)        
                        }
                    })
                })()
            }
        })
    }

    const dispatchCard = async (card) => {
        if (playerId === actualMinister) {
            // Descartar carta, si el jugador es el ministro
            const result = await axios.put(
                "http://127.0.0.1:8000/game/" + gameId + "/discard",
                {
                    player_id: actualMinister, 
                    to_discard: card
                }
            ).then(response => {
                if (response.status === 200 && response.data["message"] != undefined) {
                    ministerDiscardedCard({ ministerHasDiscardedCard: true })
                    console.log("Director will get cards...")
                    return response.data["message"]
                }
            }).catch(error => {
                if (error.response != undefined && error.response.data) {
                    return error.response.data
                }
                console.log(JSON.stringify(error))
            })

            if (result === "Card discarded") {
                alert("¡Carta descartada!")
            }
        } else if (playerId === actualDirector) {
            // Promulgar (y descartar la otra carta), si el jugador es el director
            chooseCardForBoard(card)
        }
    }

    const showCard = (card) => {
        switch(card){
            case 1: return (<button onClick={() => { dispatchCard(card) }}><img src={proclamationM} alt="Opcion de proclamacion"></img></button>)
            case 0: return (<button onClick={() => { dispatchCard(card) }}><img src={proclamationO} alt="Opcion de proclamacion"></img></button>)
            default: return <div></div>
        }
    }

    if (playerId === actualMinister) {

        if (cardsListMinister.length === 0) {
            checkMinisterCards()
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
                <div>Descartar alguna</div>
                <div className="cardsDisplayer">
                    <div>{showCard(cardsListMinister[0])}</div>
                    <div>{showCard(cardsListMinister[1])}</div>
                    <div>{showCard(cardsListMinister[2])}</div>
                </div>
            </div>
        )
    } else if (playerId === actualDirector) {
        
        if (cardsListDirector.length === 0) {
            checkDirectorCards()
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
                <div>Elegir proclamación</div>
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
    getMinisterCards,
    getDirectorCards,
    ministerDiscardedCard,
    directorChoseCard
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Cards);