import React, {useState} from 'react';
import '../../assets/css/orderBoard.css';
import proclamation from '../../assets/images/boards/o-proclamation.jpg'
import orderLogo from '../../assets/images/boards/orderLogo.png'

const OrderBoard = () =>{
    const [slots, setSlot] = useState([])
    const [proclamations, addProclamation] = useState(0)

    const changeSlot = () => {
        if(proclamations>=4) alert("La Orden gano")
        else
        setSlot([...slots, true])
        addProclamation(proclamations +1)
    }

    return (
        <div className="orderBoard">
            <div className="title">
                <div><image></image></div>
                <div><h2>Order of Fenix</h2></div>
                <div><image></image></div>
            </div>
            <button onClick= {() => {changeSlot()}}> Proclamation</button>
            <div className="order-cards-slot">
                <div className= "o-card-slot">{drawSlot(slots[0],"")}</div>
                <div className= "o-card-slot">{drawSlot(slots[1],"")}</div>
                <div className= "o-card-slot">{drawSlot(slots[2],"")}</div>
                <div className= "o-card-slot">{drawSlot(slots[3],"")}</div>
                <div className= "o-card-slot">{drawSlot(slots[4],"WIN")}</div>
            </div>
        </div>
    );
    
}

function drawSlot (slotState, gameState) {
    switch (slotState) {
    case true:   
        return (<img className="proclamation" src={proclamation}/>);
    default:     
        if (gameState == "WIN") {return <img src={orderLogo}/>}
        else return "";
    }
}

export default OrderBoard ;