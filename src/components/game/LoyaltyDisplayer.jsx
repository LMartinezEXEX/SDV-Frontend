import React from 'react'
import orderLoyalty from '../../assets/images/phoenix.jpeg';
import deathLoyalty from '../../assets/images/death_eater.jpeg'

const LoyaltyDisplayer = ({crucioLoyalty}) => {

    const displayImg = (loyalty) => {
        switch(loyalty){
            case false:  return <img src={orderLoyalty} alt="Lealtad a la Orden"/>
            case true: return <img src={deathLoyalty} alt="Lealtad a Mortifago"/>
        }
    }

    return (
        <div>
            <li> </li>
            <li>{displayImg(crucioLoyalty)}</li>
            <li> </li>
        </div>
    )
}

export default LoyaltyDisplayer
