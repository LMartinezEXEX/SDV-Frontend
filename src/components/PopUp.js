import React, { useState } from 'react'
import Modal from './Modal'

const PopUp= ({type}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
  
        <div >
          <button className= "app-btn" onClick={() => setIsOpen(true)}> {type} </button>
          <Modal open={isOpen} children={type} onClose={() => setIsOpen(false)}/>
        </div>
    
    )
}

export default PopUp;