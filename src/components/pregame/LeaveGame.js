import React from 'react';

const LeaveGame = (props) => {
    const { callbackSubmit } = props
    return (
        <div >
            <button className= "app-btn" onClick={callbackSubmit}> Abandonar Partida </button>
        </div>
    )
}

export default LeaveGame;
