import React, {useState} from 'react'
import Guessing from './spells/Guessing'
import Crucio from './spells/Crucio'
import AvadaKedavra from './spells/AvadaK'
import '../../assets/css/SpellsList.css'
import CardsDisplayer from './CardsDisplayer'
import cards from './cards'

const SpellsList = () => {
    const [showCards, setshowCards] = useState(true)
    const [Cards, setCards] = useState([1,1,0])



    return (
        <div>
                {!showCards &&
                <> 
                <ul className="SpellsList">
                    <li><Guessing setCards={setCards} setshowCards={setshowCards}/></li>
                    <li><Crucio/></li>
                    <li><AvadaKedavra/></li>
                </ul>            
                </>}
                {showCards &&
                <ul className="cardsList">
                    <CardsDisplayer cards={Cards}/>
                </ul>}
        </div>
    )
}

export default SpellsList
