
import React, { useState } from 'react'
import Modal from '../Modal'

const SignUp= () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div>
        <button className= "app-btn" onClick={() => setIsOpen(true)}> Sign Up </button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          REGISTER FORM
        </Modal>
      </div>
    </>
  )
}

export default SignUp;