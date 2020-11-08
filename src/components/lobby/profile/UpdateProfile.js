import React, { useState } from 'react'
import Modal from '../../Modal'
import '../../../assets/css/profile.css'

const UpdateProfile= (props) => {
    const {username, email} = props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div >
            <button className= "app-btn" onClick={() => setIsOpen(true)}> Modificar Perfil </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
         
            </Modal>
        </div>
    )
}

export default UpdateProfile;