import React, { useState } from 'react'
import UpdateUsername from './UpdateUsername'
import UpdatePassword from './UpdatePassword'
import UpdateIcon from './UpdateIcon'
import Modal from '../../Modal'

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div >
            <button className="app-btn" onClick={() => setIsOpen(true)}> 
                Modificar Perfil </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <UpdateUsername /> 
                <UpdatePassword /> 
                <UpdateIcon />
            </Modal>
        </div>
    )
}

export default Profile;