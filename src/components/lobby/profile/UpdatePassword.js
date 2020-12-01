import React, { useState } from 'react';
import { connect } from 'react-redux';
import UpdatePasswordForm from './UpdatePasswordForm';
import Modal from '../../Modal';
import '../../../assets/css/profile.css';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';

const UpdatePassword = (props) => {
    const { setIsOpenProfile, setMessageTopCenterOpen, setMessageTopCenter } = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdatePassword = (success = false) => {
        if (success) {
            setTimeout(() => {
                setMessageTopCenter({ 
                    messageSeverity: "success", 
                    messageTopCenter: "Contraseña actualizada con éxito" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }, 500)
        } else {
            setTimeout(() => {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: "No se pudo actualizar la contraseña" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }, 500)
        }
        setIsOpenProfile(false)
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

const mapDispatchToProps = {
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    null, 
    mapDispatchToProps
)(UpdatePassword);