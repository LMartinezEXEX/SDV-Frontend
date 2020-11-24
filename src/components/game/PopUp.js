import React, { useState } from 'react';
import Modal from '../Modal';

const PopUp= (props) => {
    const { type, enableButton, isOpenExtraCondition, handleBeforeOpen, handleBeforeClose, candidates } = props
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div>
            {(enableButton)
            ?(
                (handleBeforeOpen)
                ?(
                    <button className="app-btn" id="gameButton"
                     onClick={() => { handleBeforeOpen(); setIsOpen(true) }}> {type} </button>
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
                (isOpenExtraCondition !== undefined)
                ?(
                    <Modal open={isOpen && isOpenExtraCondition} setIsOpen={setIsOpen} children={type} candidates={candidates} 
                    onClose={() => { handleBeforeClose(); setIsOpen(false) }}/>
                ):(
                    <Modal open={isOpen} setIsOpen={setIsOpen} children={type} candidates={candidates} 
                    onClose={() => { handleBeforeClose(); setIsOpen(false) }}/>
                ) 
            ):(
                (isOpenExtraCondition !== undefined)
                ?(
                    <Modal open={isOpen && isOpenExtraCondition} setIsOpen={setIsOpen} children={type} candidates={candidates} 
                    onClose={() => setIsOpen(false)}/>
                ):(
                    <Modal open={isOpen} setIsOpen={setIsOpen} children={type} candidates={candidates} 
                    onClose={() => setIsOpen(false)}/>
                )
            )}
        </div>
    )
}

export default PopUp;