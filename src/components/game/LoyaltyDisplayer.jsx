import React from 'react'
import orderLoyalty from '../../assets/images/orderLoyalty.png';

import deathLoyalty from '../../assets/images/deathLoyalty.png'
const LoyaltyDisplayer = (props) => {
    const {crucioLoyalty} = props

    const displayImg = () => {
        switch(crucioLoyalty){
            case true:  return <img src={orderLoyalty} alt="Lealtad a la Orden"/>
            case false: return <img src={deathLoyalty} alt="Lealtad a Mortifago"/>
        }
    }

    return (
        <div>
            <li>{displayImg()}</li>
        </div>
    )
}

export default LoyaltyDisplayer
