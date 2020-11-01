import React, { useState } from 'react';
import '../../assets/css/mortifagoBoard.css';
import proclamation from '../../assets/images/boards/m-proclamation.jpg'
import snake from '../../assets/images/boards/snake.png'
import mortifLogo from '../../assets/images/boards/mortifLogo.png'

const MortifagoBoard = ({gameState}) => {

    const drawSlot = (slotId, spell) => {
        if(gameState.death_eater_promulgations >= slotId){
            return (<img className="proclamation" src={proclamation}/>);
        }else{
            if(spell == "WIN SLOT") {return <img className="logo" src={mortifLogo}/>}
            else return spell;
        }   
    }

    return (
        <div className="mortifagoBoard">
            <div className="title">
                <div></div>
                <div><h2>Mortifagos</h2></div>
                <div></div>
            </div>
            <div className="mortifago-cards-slot">
                <div className= "m-card-slot">{drawSlot(1,"")}</div>
                <div className= "m-card-slot">{drawSlot(2,"")}</div>
                <div className= "m-card-slot">{drawSlot(3,"ADIVINACION")}</div>
                <div className= "m-card-slot">{drawSlot(4,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(5,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(6,"WIN SLOT")}</div>
            </div>
        </div>
    );
}


export default MortifagoBoard ;