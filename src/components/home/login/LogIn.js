import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import LoginForm from './LoginForm';
import { login } from '../../../redux/actions';

const LogIn = (props) => {
    const { login } = props;
    const [isOpen, setIsOpen] = useState(false);
    
    const callbackLoggedInStatus = (hasLoggedIn, authorization_header) => {
        if (hasLoggedIn) {
            console.log("Authorization: success")
            login({
                isAuth: hasLoggedIn,
                type: "private",
                authorization: authorization_header
            });
        } else {
            console.log("Authorization: failed")
            login({ 
                isAuth: hasLoggedIn, 
                type: "guest", 
                authorization: "" 
            });   
        }
    }
    
    return (
        <div >
            <button className= "app-btn" onClick={() => setIsOpen(true)}> Ingresar </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <LoginForm callbackSumbit={callbackLoggedInStatus} />
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    login
};

export default connect(
    null,
    mapDispatchToProps
)(LogIn);