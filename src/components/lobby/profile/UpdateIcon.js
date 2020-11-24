import React, { useState } from 'react';
import { connect } from 'react-redux';
import UpdateIconForm from './UpdateIconForm';
import Modal from '../../Modal';
import { getIcon } from '../../../redux/actions';

const UpdateIcon = (props) => {
    const { getIcon } = props
    const [isOpen, setIsOpen] = useState(false)
    
    const callbackUpdateIcon = (success = false) => {
      if (success) {
        console.log("Update icon: success")
        getIcon({ avatar: "?" + new Date().getTime() })
      }
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
  getIcon
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateIcon);