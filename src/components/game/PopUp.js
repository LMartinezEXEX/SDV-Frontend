import React, { useState } from 'react'
import Modal from '../Modal'

const PopUp= (props) => {
    const {gameState, gameUpdater, type} = props
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div >
            <button className= "app-btn" id="gameButton"
                onClick={() => {setIsOpen(true)}}> {type} </button>
            <Modal open={isOpen} setIsOpen={setIsOpen} children={type}
                onClose={() => setIsOpen(false)}/>
        </div>
    )
}

export default PopUp;