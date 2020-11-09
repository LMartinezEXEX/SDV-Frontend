import React, { useState } from 'react'
import { connect } from 'react-redux';
import UpdateProfileForm from './UpdateProfileForm';
import Modal from '../../Modal'
import '../../../assets/css/profile.css'
import { updateUsername} from '../../../redux/actions';

const UpdateProfile = (props) => {
    const { updateUsername} = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdateUsername = (success = false, newUsername) => {
      if (success) {
        console.log("Update username: success")
        updateUsername({ newUsername: newUsername })
      } else {
        console.log("Update username: failed")
      }
    }

    const callbackUpdatePassword = (success = false) => {
      if (success) {
        console.log("Update password: success")
      } else {
        console.log("Update password: failed")
      }
    }
    
    return (
        <div >
          <button className="app-btn small-btn-group" onClick={() => setIsOpen(true)}> Modificar Perfil </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <UpdateProfileForm 
              callbackUsername={callbackUpdateUsername} 
              callbackPassword={callbackUpdatePassword} 
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
)(UpdateProfile);