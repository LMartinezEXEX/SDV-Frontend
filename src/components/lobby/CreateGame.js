import React, { useState } from 'react'
import Modal from '../Modal'
import CreateGameForm from './CreateGameForm'

const CreateGame= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Create Game </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <CreateGameForm />
          </Modal>
        </div>
    
    )
}

export default CreateGame;