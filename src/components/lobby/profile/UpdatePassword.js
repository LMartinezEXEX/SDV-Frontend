import React, { useState } from 'react'
import { connect } from 'react-redux';
import UpdatePasswordForm from './UpdatePasswordForm';
import Modal from '../../Modal'
import '../../../assets/css/profile.css'

const UpdatePassword = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdatePassword = (success = false) => {
        if (success) {
            console.log("Update password: success")
            alert('Contraseña actualizada con éxito')
        } else {
            console.log("Update password: failed")
        }
    }
    
    return (
        <div >
            <button className="app-btn small-btn-group" onClick={() => setIsOpen(true)}> 
                Modificar Password </button>
            <Modal open={isOpen}  onClose={() => setIsOpen(false)}  >
                <UpdatePasswordForm 
                callbackPassword={callbackUpdatePassword} 
                setIsOpen={setIsOpen}
                />
            </Modal>
        </div>
    )
}

export default UpdatePassword;