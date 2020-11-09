import React, { useState } from 'react'
import Modal from '../../Modal'
import CreateGameForm from './CreateGameForm'
import '../../../assets/css/pregame.css'

const CreateGame= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn small-btn-group" onClick={() => setIsOpen(true)}> Crear una partida </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <CreateGameForm />
          </Modal>
        </div>
    
    )
}

export default CreateGame;