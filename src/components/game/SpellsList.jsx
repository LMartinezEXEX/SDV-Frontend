import React, {useState} from 'react';
import Guessing from './spells/Guessing';
import Crucio from './spells/Crucio';
import AvadaKedavra from './spells/AvadaK';
import Imperius from './spells/Imperius';
import '../../assets/css/SpellsList.css';
import CardsDisplayer from './CardsDisplayer';
import LoyaltyDisplayer from './LoyaltyDisplayer';

const SpellsList = ({spell}) => {
    const [showCards, setShowCards] = useState(false)
    const [crucioLoyalty, setCrucioLoyalty] = useState(false)
    const [Cards, setCards] = useState([])
    
    const selectSpell = (spell) => {
        switch(spell){
            case "Guessing": return (<li><Guessing setCards={setCards} setshowCards={setShowCards}/></li>)
            case "Avada Kedavra": return(<li><AvadaKedavra/></li>)
            case "Crucio": return(<li><Crucio setShowCards={setShowCards} setCrucioLoyalty={setCrucioLoyalty}/></li>)
            case "Imperius": return(<li><Imperius/></li>)
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
                <ul className="loyalty">
                    <LoyaltyDisplayer crucioLoyalty={crucioLoyalty}/>
                </ul>}
        </div>
    )
}

export default SpellsList;