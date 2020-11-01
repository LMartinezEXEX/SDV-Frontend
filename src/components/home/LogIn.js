import React, { useState } from 'react'
import Modal from '../Modal'
import LoginForm from './login/LoginForm'

const LogIn= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Ingresar </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <LoginForm />
          </Modal>
        </div>
    
    )
}

export default LogIn;