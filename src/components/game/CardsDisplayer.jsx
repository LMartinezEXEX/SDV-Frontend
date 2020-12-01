import React from 'react';
import proclamationM from '../../assets/images/boards/m-proclamation.jpg';
import proclamationO from '../../assets/images/boards/o-proclamation.jpg';

const CardsDisplayer = ({cards}) => {

    const displayImg = (card) => {
        switch(card){
            case 0: return <img src={proclamationO} alt="Proclamacion Orden"/>
            case 1: return <img src={proclamationM} alt="Proclamacion Mortifago"/>
            default: return <div></div>
        }
    }

    return (
        <>
            <li>{displayImg(cards[0])}</li>
            <li>{displayImg(cards[1])}</li>
            <li>{displayImg(cards[2])}</li>
        </>
    )
}

export default CardsDisplayer;