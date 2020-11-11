import React from 'react'
import Guessing from './spells/Guessing'
import Crucio from './spells/Crucio'
import AvadaKedavra from './spells/AvadaK'
import '../../assets/css/SpellsList.css'

const SpellsList = () => {
    return (
        <div>
            <ul className="SpellsList">
                <li><Guessing/></li>
                <li><Crucio/></li>
                <li><AvadaKedavra/></li>
            </ul>            
        </div>
    )
}

export default SpellsList
