import React from 'react';
import orderLoyalty from '../../assets/images/phoenix.jpeg';
import deathLoyalty from '../../assets/images/death_eater.jpeg';

const LoyaltyDisplayer = ({ crucioLoyalty }) => {

    const displayImg = (loyalty) => {
        switch(loyalty){
            case true:  return <img src={orderLoyalty} alt="Lealtad a la Orden"/>
            case false: return <img src={deathLoyalty} alt="Lealtad a Mortifago"/>
            default: return <></>
        }
    }

    return (
        <div>
            <li>{displayImg(crucioLoyalty)}</li>
        </div>
    )
}

export default LoyaltyDisplayer;