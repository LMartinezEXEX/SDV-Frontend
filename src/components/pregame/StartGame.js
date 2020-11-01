import React, { useState } from 'react'
import { useHistory } from "react-router-dom"


const StartGame= () => {
    const history = useHistory();
    
   /* 
    const gameInit = async(event) => {
    }
    
     async () => {
         await axios.put("http://127.0.0.1:8000/game/"+gameState.gameId+"/select_MM")
         }
         */
    return (

        <div >
            <button className= "app-btn" onClick={() => 
                history.push("/game", { from: "PreGame" })}> Iniciar Partida </button>
        </div>
    
    )
}

export default StartGame;