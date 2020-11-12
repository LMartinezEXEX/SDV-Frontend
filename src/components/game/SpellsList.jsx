import React, {useState} from 'react'
import Guessing from './spells/Guessing'
import Crucio from './spells/Crucio'
import AvadaKedavra from './spells/AvadaK'
import '../../assets/css/SpellsList.css'
import CardsDisplayer from './CardsDisplayer'

const SpellsList = ({spell}) => {
    const [showCards, setshowCards] = useState(false)
    const [Cards, setCards] = useState([])
    
    const selectSpell = (spell) => {
        switch(spell){
            case "Guessing": return (<li><Guessing setCards={setCards} setshowCards={setshowCards}/></li>)
            case "Avada Kedavra": return(<li><AvadaKedavra/></li>)
            case "Crucio": return(<li><Crucio/></li>)
        }
    }

    return (
        <div>
                {!showCards &&
                <> 
                <ul className="SpellsList">
                    {selectSpell(spell)}
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
