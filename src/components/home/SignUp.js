
import React, { useState } from 'react'
import Modal from '../Modal'

function SignUp() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div>
        <button className= "app-btn" onClick={() => setIsOpen(true)}>Sign up</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          REGISTER FORM
        </Modal>
      </div>
    </>
  )
}

export default SignUp;