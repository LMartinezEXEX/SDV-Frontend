import React, { useState } from 'react'
import Modal from '../Modal'
import RegisterForm from './register/RegisterForm'
import '../../assets/css/RegisterForm.css'

const LogIn= () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Ingresar </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <RegisterForm />
          </Modal>
        </div>
    
    )
}

export default LogIn;
