import React, { useState } from 'react'
import Modal from '../Modal'
import JoinForm from './join/JoinForm'

const JoinGame= () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div >
            <button className= "app-btn" onClick={() => setIsOpen(true)}> Join Game </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <JoinForm />
            </Modal>
        </div>
    )
}

export default JoinGame;
