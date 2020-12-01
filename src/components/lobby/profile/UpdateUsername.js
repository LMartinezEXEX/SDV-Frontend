import React, { useState } from 'react'
import { connect } from 'react-redux';
import UpdateProfileForm from './UpdateUsernameForm';
import Modal from '../../Modal'
import '../../../assets/css/profile.css'
import { updateUsername, setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';

const UpdateUsername = (props) => {
    const { setIsOpenProfile, updateUsername, setMessageTopCenterOpen, setMessageTopCenter } = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdateUsername = (success = false, newUsername) => {
        if (success) {
            updateUsername({ newUsername: newUsername })
            setTimeout(() => {
                setMessageTopCenter({ 
                    messageSeverity: "success", 
                    messageTopCenter: "Username actualizado con éxito" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }, 500)
        } else {
            setTimeout(() => {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: "No se pudo al actualizar el username" 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }, 500)
        }
        setIsOpenProfile(false)
    }
    
    return (
        <div >
            <button className="app-btn small-btn-group" onClick={() => setIsOpen(true)}> 
                Modificar Username </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <UpdateProfileForm 
                callbackUsername={callbackUpdateUsername} 
                setIsOpen={setIsOpen}
                />
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    updateUsername, setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    null,
    mapDispatchToProps
)(UpdateUsername);