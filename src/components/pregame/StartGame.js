import React from 'react';

const StartGame= (props) => {
    const { callbackSubmit } = props
    return (
        <div >
            <button className= "app-btn" onClick={callbackSubmit}> Iniciar Partida </button>
        </div>
    )
}

export default StartGame;