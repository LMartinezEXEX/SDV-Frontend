import React, { useState } from 'react';
import '../../assets/css/mortifagoBoard.css';
import proclamation from '../../assets/images/boards/m-proclamation.jpg'
import snake from '../../assets/images/boards/snake.png'
import mortifLogo from '../../assets/images/boards/mortifLogo.png'

const MortifagoBoard = () => {
    const [slots, setSlot] = useState([])
    const [proclamations, addProclamation] = useState(0)

    const changeSlot = () => {
        if(proclamations>=5) alert("Mortifagos ganaron")
        else
        setSlot([...slots, true])
        addProclamation(proclamations +1)
        
    }

    return (
        <div className="mortifagoBoard">
            <div className="title">
                <div></div>
                <div><h2>Mortifagos</h2></div>
                <div></div>
            </div>
            <button onClick= {() => {changeSlot()}}> Proclamation</button>
            <div className="mortifago-cards-slot">
                <div className= "m-card-slot">{drawSlot(slots[0],"")}</div>
                <div className= "m-card-slot">{drawSlot(slots[1],"")}</div>
                <div className= "m-card-slot">{drawSlot(slots[2],"ADIVINACION")}</div>
                <div className= "m-card-slot">{drawSlot(slots[3],"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(slots[4],"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(slots[5],"WIN")}</div>
            </div>
        </div>
    );
}

function drawSlot (slotState, spell) {
    switch (slotState) {
        case true:   
            return (<img className="proclamation" src={proclamation}/>);
        default:   
            if(spell == "WIN") {return <img className="logo" src={mortifLogo}/>}
            else return spell;
    }
}

export default MortifagoBoard ;