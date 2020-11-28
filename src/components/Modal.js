import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'
import ChargeTable from '../components/game/chargesTable'
import Votation from '../components/game/votation'
import Cards from './game/cards'
import Director from './game/director'
import LeaveGame from './game/leaveGame'

// a switch to know the information that will be displayed in the open window

const Modal = ({ open, setIsOpen, children, onClose, candidates}) => { //children is what you write inside the MODAL
    if (!open) return null 

    const windowData = (children) => { 
        switch(children){
            case "Resultado electoral": return(<ChargeTable />)
            case "Votar": return(<Votation onSelect={onClose} />)
            case "Cartas": return(<Cards setIsOpen={setIsOpen}/>)
            case "Elegir candidato a director": return(<Director candidates={candidates} onSelect={onClose} />)
            case "Salir": return(<LeaveGame onSelect={onClose} />)
            default: return children
        }
    }

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
