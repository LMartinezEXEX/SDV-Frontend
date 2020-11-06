import React, { useState } from 'react'
import Modal from '../../Modal'
import RegisterForm from './RegisterForm'
import '../../../assets/css/RegisterForm.css'

const SignUp= () => {
    const [isOpen, setIsOpen] = useState(false)
    //const [hasRegistered, setHasRegistered] = useState(false);
    
    /*
    const callbackRegister = (registerData) => {
        setHasRegistered(registerData)
    }*/
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> Registrarse </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <RegisterForm />
          </Modal>
        </div>
    
    )
}

export default SignUp;
