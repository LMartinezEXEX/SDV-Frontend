import React from 'react';
import '../../assets/css/mortifagoBoard.css';
import proclamation from '../../assets/images/boards/m-proclamation.jpg'
//import snake from '../../assets/images/boards/snake.png'
import mortifLogo from '../../assets/images/boards/mortifLogo.png'

const MortifagoBoard = (props) => {
    const {amountPlayers, death_eater_promulgations} = props

    const drawSlot = (slotId, spell) => {
        if(death_eater_promulgations >= slotId){
            return (<img className="proclamation" src={proclamation} alt="proclamacion"/>);
        }else{
            if(spell === "WIN SLOT") {return <img className="logo" src={mortifLogo} alt="Logo mortifagos"/>}
            else return <h5>{spell}</h5>;
        }   
    }

    const selectBoards = () => {
        if(amountPlayers<=6){
            return(
            <>
                <div className= "m-card-slot">{drawSlot(1,"")}</div>
                <div className= "m-card-slot">{drawSlot(2,"")}</div>
                <div className= "m-card-slot">{drawSlot(3,"ADIVINACION")}</div>
                <div className= "m-card-slot">{drawSlot(4,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(5,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(6,"WIN SLOT")}</div>
            </>)
        }
        else if(amountPlayers<=8) {
            return(
                <>
                <div className= "m-card-slot">{drawSlot(1,"")}</div>
                <div className= "m-card-slot">{drawSlot(2,"CRUCIO")}</div>
                <div className= "m-card-slot">{drawSlot(3,"IMPERIO")}</div>
                <div className= "m-card-slot">{drawSlot(4,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(5,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(6,"WIN SLOT")}</div>
            </>
            )
        }
        else if(amountPlayers>8) {
            return(
                <>
                <div className= "m-card-slot">{drawSlot(1,"CRUCIO")}</div>
                <div className= "m-card-slot">{drawSlot(2,"CRUCIO")}</div>
                <div className= "m-card-slot">{drawSlot(3,"IMPERIO")}</div>
                <div className= "m-card-slot">{drawSlot(4,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(5,"AVADA KEDAVRA")} </div>
                <div className= "m-card-slot">{drawSlot(6,"WIN SLOT")}</div>
                </>
            )
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
                {selectBoards()}
            </div>
        </div>
    );
}


export default MortifagoBoard ;