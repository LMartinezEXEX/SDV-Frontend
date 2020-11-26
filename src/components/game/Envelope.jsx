import React, { useState } from 'react'
import Modal from '../Modal'
import Lottie from "react-lottie";
import animationData from "../../assets/envelope.json";
import voldemort from '../../assets/images/voldemort.PNG'
import death_eater from '../../assets/images/death_eater.jpeg'
import fenix from '../../assets/images/phoenix.jpeg'
import '../../assets/css/App.css'

const defaultOptions = {
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

const selectRole = (playerRole) => {
    switch(playerRole){
        case "Fenix Order": 
            return (<img className="img-role" src={fenix} alt="Orden del Fenix" /> )
        case "Voldemort": 
            return (<img className="img-role" src={voldemort} alt="Voldemort" />)
        case "Death Eater": 
            return (<img className="img-role" src={death_eater} alt="Mortífago"/>)
        default: return <div></div>
    }
}

const Envelope = ({playerRole}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div >
            <div className='envelope' onClick={() => setIsOpen(true)}>
                <Lottie options={defaultOptions} height={80} width={80} />  
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {selectRole(playerRole)}
            </Modal>
        </div>
    )
}

export default Envelope;