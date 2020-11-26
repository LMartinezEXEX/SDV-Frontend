import React, { useState } from 'react'
import Modal from '../Modal'

const PopUp= (props) => {
    const { type, enableButton, handleState, handleBeforeClose } = props
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div>
            {(enableButton)
            ?(
                (handleState)
                ?(
                    <button className="app-btn" id="gameButton"
                     onClick={() => { handleState(); setIsOpen(true) }}> {type} </button>
                ):(
                    <button className="app-btn" id="gameButton"
                     onClick={() => { setIsOpen(true) }}> {type} </button>
                )
            ):(
                <button className="app-btn" id="gameButton"
                onClick={undefined} > {type} </button>                
            )}
            {(handleBeforeClose)
            ?(
                <Modal open={isOpen} setIsOpen={setIsOpen} children={type}
                    onClose={() => { handleBeforeClose(); setIsOpen(false) }}/>
            ):(
                <Modal open={isOpen} setIsOpen={setIsOpen} children={type}
                    onClose={() => setIsOpen(false)}/>
            )}
        </div>
    )
}

export default PopUp;