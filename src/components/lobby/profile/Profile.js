import React, { useState } from 'react'
import UpdateUsername from './UpdateUsername'
import UpdatePassword from './UpdatePassword'
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
            </Modal>
        </div>
    )
}

export default Profile;