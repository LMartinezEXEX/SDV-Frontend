import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'
import ChargeTable from '../components/game/chargesTable'

// a switch to know the information that will be displayed in the open window
const windowData = (children) => { 
    switch(children){
        case "Cargos": return(<ChargeTable/>)
        default: return children
    }
}

const Modal = ({ open, children, onClose }) => { //children is what you write inside the MODAL
    if (!open) return null

    return ReactDom.createPortal(
    <>
        <div className="overlay" />
            <div className="modal">
            <button className= "close-btn" onClick={onClose}> </button>
                {windowData(children)}
                
        </div>
    </>,
    document.getElementById('portal')
  )
}


export default Modal;