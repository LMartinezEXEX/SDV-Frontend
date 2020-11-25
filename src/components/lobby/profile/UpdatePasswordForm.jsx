import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import Input from '../../Input';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_UPDATE_PASSWORD } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const UpdatePasswordForm = (props) => {
    const { 
        callbackPassword, email, authorization, setIsOpen, 
        setMessageTopCenterOpen, setMessageTopCenter
    } = props

    const [password, setPassword ] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    
    function handlePasswordChange(name, value) {
        if (name === "password") {
            setPassword(value)
        } else if (name === "new-password") {
            setNewPassword(value)
        } else if (name === 'new-password-verify') {
            setPasswordVerify(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (newPassword) {
            await axios(
                SERVER_URL + USER_UPDATE_PASSWORD, {
                method: "PUT",
                data: {
                    email: email,
                    old_password: password,
                    new_password: newPassword,
                    new_password_verify: passwordVerify
                },
                headers: {
                    crossDomain: true,
                    "Authorization": authorization
                }
            }).then(response => {
                if (response.status === 200) {
                    callbackPassword(true)
                }
            }).catch(error => {
                if (error.response && error.response.data["detail"] !== undefined) {
                    const error_detail = error.response.data["detail"]
                    if (Array.isArray(error_detail)) {
                        var error_string = ""
                        var field = ""
                        for (var i = 0; i < error_detail.length; i++) {
                            field = error_detail[i]["loc"][(error_detail[i]["loc"].length > 1) + 0]
                            error_string += field + ": " + errorTranslate(error_detail[i]["msg"]) + ((error_detail.length > 1)?"; ":"")
                        }
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: error_string 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    } else {
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: errorTranslate(error_detail) 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    }
                } else if (error.request) {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: errorTranslate(error.message) 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                } else {
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
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        placeholder: "Contraseña actual"
                    }}
                        handleChange={handlePasswordChange}
                    />
                </label>
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'new-password',
                        name: 'new-password',
                        type: 'password',
                        placeholder: "Contraseña nueva"
                    }}
                        handleChange={handlePasswordChange}
                    />
                </label>
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'new-password-verify',
                        name: 'new-password-verify',
                        type: 'password',
                        placeholder: "Confirmar contraseña"
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
)(UpdatePasswordForm);