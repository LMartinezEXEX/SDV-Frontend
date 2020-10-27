import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'
import ChargeTable from '../components/game/chargesTable'
import Votation from '../components/game/votation'

// a switch to know the information that will be displayed in the open window
const windowData = (children) => { 
    switch(children){
        case "Cargos": return(<ChargeTable/>)
        case "Votar": return(<Votation/>)
        default: return children
    }
}

const Modal = ({ open, children, onClose }) => { //children is what you write inside the MODAL
    if (!open) return null

    return ReactDom.createPortal(
    <>
        <div className="overlay" />
            <div className="modal">
                {windowData(children)}
                <button className= "app-btn small-btn" onClick={onClose}> Cerrar </button>
        </div>
    </>,
    document.getElementById('portal')
  )
}


export default Modal;