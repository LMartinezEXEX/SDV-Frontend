import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import LoginForm from './LoginForm';
import { login } from '../../../redux/actions';

const LogIn = (props) => {
    const { login } = props
    const [isOpen, setIsOpen] = useState(false);
    
    const callbackLoggedInStatus = (hasLoggedIn, authorization_header, email, username) => {
        if (hasLoggedIn) {
            login({
                isAuth: hasLoggedIn,
                type: "private",
                authorization: authorization_header,
                email: email,
                username: username
            })
        } else {
            login({ 
                isAuth: hasLoggedIn, 
                type: "guest", 
                authorization: "",
                email: "",
                username: ""
            })   
        }
    }
    
    return (
        <div >
            <button className= "app-btn" onClick={() => setIsOpen(true)}> Ingresar </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <LoginForm callbackSubmit={callbackLoggedInStatus} />
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(
    null,
    mapDispatchToProps
)(LogIn);