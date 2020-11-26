import React, { useState } from 'react';
import { connect } from 'react-redux';
import UpdateIconForm from './UpdateIconForm';
import Modal from '../../Modal';
import { getIcon, setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';


const UpdateIcon = (props) => {
    const { setIsOpenProfile, getIcon, setMessageTopCenterOpen, setMessageTopCenter } = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdateIcon = (success = false) => {
      if (success) {
        getIcon({ timeBreaker: "?" + new Date().getTime() })
        setTimeout(() => {
            setMessageTopCenter({ 
                messageSeverity: "success", 
                messageTopCenter: "Avatar actualizado con éxito" 
            })
            setMessageTopCenterOpen({ messageTopCenterOpen: true })
        }, 500)
      } else {
        setTimeout(() => {
            setMessageTopCenter({ 
                messageSeverity: "warning", 
                messageTopCenter: "No se pudo al actualizar el avatar" 
            })
            setMessageTopCenterOpen({ messageTopCenterOpen: true })
        }, 500)
      }
      setIsOpenProfile(false)
    }

    return (
        <div >
          <button className="app-btn small-btn-group" onClick={() => setIsOpen(true)}> Modificar avatar </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <UpdateIconForm 
              callbackIcon={callbackUpdateIcon}
              setIsOpen={setIsOpen}
            />
          </Modal>
        </div>
    )
}

const mapDispatchToProps = {
  getIcon, setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
  null,
  mapDispatchToProps
)(UpdateIcon);