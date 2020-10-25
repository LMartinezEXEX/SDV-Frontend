import React, { useState } from 'react'
import Modal from '../Modal'

const LogIn= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Log In </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            LOGIN FORM
          </Modal>
        </div>
    
    )
}

export default LogIn;