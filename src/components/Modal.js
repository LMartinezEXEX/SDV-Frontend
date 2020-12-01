import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'
import ChargeTable from '../components/game/chargesTable'
import Votation from '../components/game/votation'
import Cards from './game/cards'
import Director from './game/director'
import LeaveGame from './game/leaveGame'

const Modal = ({ open, setIsOpen, children, onClose, candidates}) => { 
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
            <div/>
        </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
