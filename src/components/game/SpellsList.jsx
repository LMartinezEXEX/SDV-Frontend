import React, {useState} from 'react';
import Guessing from './spells/Guessing';
import Crucio from './spells/Crucio';
import AvadaKedavra from './spells/AvadaK';
import Imperius from './spells/Imperius';
import '../../assets/css/SpellsList.css';
import CardsDisplayer from './CardsDisplayer';
import LoyaltyDisplayer from './LoyaltyDisplayer';
import Expelliarmus from './spells/Expelliarmus';

const SpellsList = (props) => {
    const {spell, enableExpelliarmus} = props
    const [showCards, setShowCards] = useState(false)
    const [crucioLoyalty, setCrucioLoyalty] = useState(false)
    const [Cards, setCards] = useState([])
    
    const selectSpell = (spell) => {
        switch(spell){
            case "Guessing": return (<li><Guessing setCards={setCards} setshowCards={setShowCards}/></li>)
            case "Avada Kedavra": return(<li><AvadaKedavra/></li>)
            case "Crucio": return(<li><Crucio setShowCards={setShowCards} setCrucioLoyalty={setCrucioLoyalty}/></li>)
            case "Imperius": return(<li><Imperius/></li>)
            case "Acept Expelliarmus": return(<li><Expelliarmus/></li>)
            case "Decline Expelliarmus": return(<li><Expelliarmus/></li>)
        }
    }

    return (
        <div>
            {enableExpelliarmus &&
                <>
                <ul className="ExpelliarmusOptions">
                    <h4>Expelliarmus</h4>
                    {selectSpell("Acept Expelliarmus")}
                    {selectSpell("Decline Expelliarmus")}
                </ul>
                </>
            }
            {!enableExpelliarmus && !showCards &&
                <> 
                <ul className="SpellsList">
                    {selectSpell(spell)}
                </ul>            
                </>
            }
            {!enableExpelliarmus && showCards && spell==="Guessing" &&
                <ul className="cardsList">
                    <CardsDisplayer cards={Cards}/>
                </ul>}
                {!enableExpelliarmus && showCards && spell==="Crucio" &&
                <ul className="loyalty">
                    <LoyaltyDisplayer crucioLoyalty={crucioLoyalty}/>
                </ul>
            }
        </div>
    )
}

export default SpellsList;