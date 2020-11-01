import React, {useState} from 'react'
import axios from 'axios'
import proclamationM from '../../assets/images/boards/m-proclamation.jpg'
import proclamationO from '../../assets/images/boards/o-proclamation.jpg'
import '../../assets/css/cards.css';

function Cards({gameState, gameUpdater, setIsOpen}) {
    const [cards, setCards] = useState([])

    const putProclamation = async (promulgationId) => {
        // gameUpdater()
        await axios.put("http://127.0.0.1:8000/game/"+3+/*Replace with gameId*/"/promulgate", {
        
            "candidate_id": gameState.current_minister_id,
            "to_promulgate": promulgationId
        
        }).then(res=>{
            gameUpdater()
            setIsOpen(false)
        })
    }

    const TakeCards = async() => {
        await axios.put("http://127.0.0.1:8000/game/"+3+/*Replace with gameId*/"/get_cards", {
        method:'PUT',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            setCards(res.data.cards)
        })
    }
    
    const showCard = (card) => {
        switch(card){
            case 1: return (<button onClick={() => {putProclamation(1)}}><img src={proclamationM}></img></button>)
            case 0: return (<button onClick={() => {putProclamation(1)}}><img src={proclamationO}></img></button>)
            default: return <div></div>
        }
    }
    return (
        <div>
            <button className="buttonTaker" onClick={TakeCards}>Tomar 3 cartas</button>
            <div className="cardsDisplayer">
                <div>{showCard(cards[0])}</div>
                <div>{showCard(cards[1])}</div>
                <div>{showCard(cards[2])}</div>
            </div>
        </div>
    )
}

export default Cards
