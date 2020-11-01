import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const StartGame= () => {
    const history = useHistory();
    
    return (
        <div >
            <button className= "app-btn" onClick={() => 
                history.push("/game", { from: "PreGame" })}> Iniciar Partida </button>
        </div>
    
    )
}

export default StartGame;