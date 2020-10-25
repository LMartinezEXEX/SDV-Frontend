import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({ open, children, onClose }) => { //children is what you write inside the MODAL
    if (!open) return null

    return ReactDom.createPortal(
    <>
        <div className="overlay" />
            <div className="modal">
                {children}
                <button className= "app-btn small-btn" onClick={onClose}>CLOSE</button>
        </div>
    </>,
    document.getElementById('portal')
  )
}


export default Modal;