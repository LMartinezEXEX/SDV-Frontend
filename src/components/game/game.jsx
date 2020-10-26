import React,{ Component , useState} from 'react'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import PopUp from '../PopUp'

const Game= () => {
    // This array is reemplaced for the players info taked with endpoints
    const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"] 
    // const [ministro, setMinistro] = useState("-")
    // const [nextMinisterIndex, setNextMinister] = useState(1)
    
    // const changeMinister = () => {
    //     setMinistro(players[nextMinisterIndex-1])
    //     if (nextMinisterIndex === 5) setNextMinister(1)
    //     else setNextMinister(nextMinisterIndex+1)
        
    // }
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

