import React, { useState } from 'react'
import Modal from '../Modal'

const CreateGame= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Create Game </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            GAME FORM
          </Modal>
        </div>
    
    )
}

export default CreateGame;