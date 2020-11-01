import React from 'react';
import '../../assets/css/orderBoard.css';
import proclamation from '../../assets/images/boards/o-proclamation.jpg'
import orderLogo from '../../assets/images/boards/orderLogo.png'

const OrderBoard = ({gameState}) =>{

    const drawSlot = (slotId, spell) => {
        if(gameState.fenix_promulgations >= slotId){
            return (<img className="proclamation" src={proclamation} alt="proclamacion"/>);
        }else{
            if(spell === "WIN SLOT") {return <img className="logo" src={orderLogo} alt="Logo orden"/>}
            else return spell;
        }
    }

    return (
        <div className="orderBoard">
            <div className="title">
                <div><img alt="serpiente"/></div>
                <div><h2>Order of Fenix</h2></div>
                <div><img alt="serpiente"/></div>
            </div>
            {/* <button onClick= {() => {changeSlot()}}> Proclamation</button> */}
            <div className="order-cards-slot">
                <div className= "o-card-slot">{drawSlot(1,"")}</div>
                <div className= "o-card-slot">{drawSlot(2,"")}</div>
                <div className= "o-card-slot">{drawSlot(3,"")}</div>
                <div className= "o-card-slot">{drawSlot(4,"")}</div>
                <div className= "o-card-slot">{drawSlot(5,"WIN SLOT")}</div>
            </div>
        </div>
    );
}



export default OrderBoard ;