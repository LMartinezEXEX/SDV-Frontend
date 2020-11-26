import React, { useState } from 'react'
import { connect } from 'react-redux';
import UpdateProfileForm from './UpdateUsernameForm';
import Modal from '../../Modal'
import '../../../assets/css/profile.css'
import { updateUsername} from '../../../redux/actions';

const UpdateUsername = (props) => {
    const { updateUsername} = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdateUsername = (success = false, newUsername) => {
      if (success) {
        console.log("Update username: success")
        alert('Username actualizado con éxito')
        updateUsername({ newUsername: newUsername })
      } else {
        console.log("Update username: failed")
        alert('Error al actualizar el username')
      }
    }
    
    return (
        <div >
          <button className="app-btn small-btn-group" onClick={() => setIsOpen(true)}> Modificar Username </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <UpdateProfileForm 
              callbackUsername={callbackUpdateUsername} 
              setIsOpen={setIsOpen}
            />
          </Modal>
        </div>
    )
}

const mapDispatchToProps = {
  updateUsername
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateUsername);