import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'

const Modal = ({ open, children, onClose }) => { //children is what you write inside the MODAL
    if (!open) return null

    return ReactDom.createPortal(
    <>
        <div className="overlay" />
            <div className="modal">
                {children}
                <button className= "app-btn small-btn" onClick={onClose}> Cerrar </button>
        </div>
    </>,
    document.getElementById('portal')
  )
}


export default Modal;