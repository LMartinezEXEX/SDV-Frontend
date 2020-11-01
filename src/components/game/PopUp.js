import React, { useState } from 'react'
import Modal from '../Modal'
import ChargeTable from './chargesTable'

const PopUp= (props) => {
    const {gameState, gameUpdater, type} = props
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => { setIsOpen(true) 
                                                        gameUpdater()}}> {type} </button>
          <Modal gameState={gameState} gameUpdater={gameUpdater}
                open={isOpen} setIsOpen={setIsOpen} children={type}
                onClose={() => setIsOpen(false)}/>
        </div>
    
    )
}

export default PopUp;