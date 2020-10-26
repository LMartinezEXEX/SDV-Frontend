import React from 'react'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import PopUp from '../PopUp'

const Game= () => {
        return(
        <div className="gameView">
            <div className="gameBox">
                <div className="gameSection">
                    <MortifagoBoard/>
                </div>
                <div className="gameSection">
                    <div className="buttonSection">
                        <div><PopUp type="Cargos"/></div>
                        <div><PopUp type="Votar"/></div>
                        <div><PopUp type="Info"/></div>
                    </div>
                </div>
                <div className="gameSection">
                    <OrderBoard/>
                </div>
            </div>
        </div>);
}

export default Game;

