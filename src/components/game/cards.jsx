import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import proclamationM from '../../assets/images/boards/m-proclamation.jpg'
import proclamationO from '../../assets/images/boards/o-proclamation.jpg'
import '../../assets/css/cards.css';

const Cards = (props) => {
    const [cards, setCards] = useState([])
    const {gameId, playerId, actualMinister, setIsOpen} = props;

    // const changeMinister = async () => {
    //     await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
    //     .then(res => {
    //         gameUpdater()
    //     })
    // }

    const putProclamation = async (promulgationId) => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/promulgate", {
            "candidate_id": playerId,
            "to_promulgate": promulgationId
        }).then(res=>{
            // if(gameState.death_eater_promulgations === 5 && promulgationId) {alert("GANARON LOS MORTIFAGOS")}
            // else if( gameState.fenix_promulgations === 4 && !promulgationId) {alert("GANO LA ORDEN DEL FENIX")}
            // gameUpdater()
            // changeMinister()
            setIsOpen(false)
        })
    }

    const TakeCards = async() => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/get_cards", {
        method:'PUT',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            setCards(res.data.cards)
        })
    }
    
    const showCard = (card) => {
        switch(card){
            case 1: return (<button onClick={() => {putProclamation(1)}}><img src={proclamationM} alt="Opcion de proclamacion"></img></button>)
            case 0: return (<button onClick={() => {putProclamation(0)}}><img src={proclamationO} alt="Opcion de proclamacion"></img></button>)
            default: return <div></div>
        }
    }
    return (
        <div>
            {(playerId === actualMinister) && 
            <>
                <button className="buttonTaker" onClick={TakeCards}>
                    Tomar 3 cartas
                </button>
                <div className="cardsDisplayer">
                    <div>{showCard(cards[0])}</div>
                    <div>{showCard(cards[1])}</div>
                    <div>{showCard(cards[2])}</div>
                </div>
            </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        actualMinister: state.game.actualMinister 
    };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);    