import React, {useState} from 'react'
import Guessing from './spells/Guessing'
import Crucio from './spells/Crucio'
import AvadaKedavra from './spells/AvadaK'
import '../../assets/css/SpellsList.css'
import CardsDisplayer from './CardsDisplayer'
import LoyaltyDisplayer from './LoyaltyDisplayer'

const SpellsList = ({spell}) => {
    const [showCards, setshowCards] = useState(false)
    const [crucioLoyalty, setCrucioLoyalty] = useState(false)
    const [Cards, setCards] = useState([])
    
    const selectSpell = (spell) => {
        switch(spell){
            case "Guessing": return (<li><Guessing setCards={setCards} setshowCards={setshowCards}/></li>)
            case "Avada Kedavra": return(<li><AvadaKedavra/></li>)
            case "Crucio": return(<li><Crucio setshowCards={setshowCards} setCrucioLoyalty={setCrucioLoyalty}/></li>)
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
                {showCards && spell==="Guessing" &&
                <ul className="cardsList">
                    <CardsDisplayer cards={Cards}/>
                </ul>}
                {showCards && spell==="Crucio" &&
                <ul className="cardsList">
                    <LoyaltyDisplayer crucioLoyalty={crucioLoyalty}/>
                </ul>}
        </div>
    )
}

export default SpellsList
