import React from 'react'

const DeleteGame= (props) => {
    const { callbackSubmit } = props
    return (
        <div >
            <button className= "app-btn" onClick={callbackSubmit}> Eliminar Partida </button>
        </div>
    )
}

export default DeleteGame;
