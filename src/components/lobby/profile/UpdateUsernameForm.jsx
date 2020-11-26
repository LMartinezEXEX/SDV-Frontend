import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import Input from '../../Input';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_UPDATE_USERNAME } from '../../constantsEndpoints';
import { errorTranslate, errorConcat } from '../../errorTranslate';

const UpdateProfileForm = (props) => {
    const { 
        callbackUsername, email, authorization, setIsOpen,
        setMessageTopCenterOpen, setMessageTopCenter 
    } = props

    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword ] = useState("");
    
    function handlePasswordChange(name, value) {
        if (name === "password") {
            setPassword(value)
        }
    }

    function handleNewUsernameChange(name, value) {
        if (name === "new-username") {
            setNewUsername(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        if (newUsername) {
            await axios(
                SERVER_URL + USER_UPDATE_USERNAME, {
                method: "PUT",
                data: {
                    email: email,
                    password: password,
                    new_username: newUsername
                },
                headers: {
                    crossDomain: true,
                    "Authorization": authorization
                }
            }).then(response => {
                if (response.status === 200) {
                    callbackUsername(true, newUsername)
                }
            }).catch(error => {
                if (error.response && error.response.data["detail"] !== undefined) {
                    if (Array.isArray(error.response.data["detail"])) {
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: errorConcat(error.response.data["detail"]) 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    } else {
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: errorTranslate(error.response.data["detail"]) 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    }
                } else if (error.response) {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: errorTranslate(error.message) 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                } else if (error.request) {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: errorTranslate(error.message) 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                }
            })
        }
        setIsOpen(false)
    }
    
    return (
        <form className='profile-container' onSubmit={handleSubmit}>
            <div>
                <label >
                    <Input attribute={{
                        id: 'new-username',
                        name: 'new-username',
                        type: 'text',
                        placeholder: "Nuevo Username"
                    }}
                        handleChange={handleNewUsernameChange}
                    />
                </label>
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        placeholder: "Contraseña"
                    }}
                        handleChange={handlePasswordChange}
                    />
                </label>
            </div>
            <button type="submit" className="app-btn small-btn"> Modificar </button>
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    authorization: state.user.authorization
  };
}

const mapDispatchToProps = {
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateProfileForm);