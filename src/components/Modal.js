import React from 'react'
import ReactDom from 'react-dom'
import '../assets/css/modal.css'
import ChargeTable from '../components/game/chargesTable'
import Votation from '../components/game/votation'
import Cards from './game/cards'
import Director from './game/director'

// a switch to know the information that will be displayed in the open window

const Modal = ({ open, setIsOpen, children, onClose, candidates}) => { //children is what you write inside the MODAL
    if (!open) return null 

    const windowData = (children) => { 
        switch(children){
            case "Cargos": return(<ChargeTable />)
            case "Votar": return(<Votation />)
            case "Cartas": return(<Cards setIsOpen={setIsOpen} />)
            case "Director": return(<Director candidates={candidates}/>)
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
