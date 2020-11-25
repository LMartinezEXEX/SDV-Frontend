import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../Input';
import '../../../assets/css/form.css';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_LOGIN, USER_PROFILE } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const LoginForm = (props) => {
    const { callbackSubmit, setMessageTopCenterOpen, setMessageTopCenter } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    
    function handleChange(name, value) {
        if (name === 'email') {
            if (value.length >= 10) {
                setEmail(value)
            } else {
                setEmail('')
            }
        } else {
            if (value.length < 8) {
                setPassword('')
                setPasswordError(true);
            } else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    }

    const getProfile = async (email, authorization) => {
        await axios(
            SERVER_URL + USER_PROFILE + email, {
            method: "GET",
            headers: {
                'accept': 'application/json'
            }
        }).then(response => {
            callbackSubmit(
                true,
                authorization,
                email,
                response.data.username
            )
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.response.data["detail"] 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.response) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.message 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.request) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: error.message 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
            callbackSubmit(
                false,
                "",
                "",
                ""
            )
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formLogin = new FormData()
        formLogin.append("email", email)
        formLogin.append("password", password)

        await axios(
            SERVER_URL + USER_LOGIN, {
            method: "POST",
            data: formLogin,
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            }
        }).then(response => {
            const authorization = response.headers["authorization"]
            if (response.status === 200 && authorization) {
                getProfile(email, authorization)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                const error_detail = error.response.data["detail"]
                if (Array.isArray(error_detail)) {
                    var error_string = ""
                   // var field = ""
                    for (var i = 0; i < error_detail.length; i++) {
                        //field = error_detail[i]["loc"][(error_detail[i]["loc"].length > 1) + 0]
                        error_string +=  errorTranslate(error_detail[i]["msg"]) + ((error_detail.length > 1)?"; ":"")
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
            } else if (error.response) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.message) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.request) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.message) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }
    

    return (
        
        <form className='login-container' onSubmit={handleSubmit}>
            <div> 
                <label >
                    <Input attribute={{
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        required: 'required',
                        placeholder: 'Email'
                    }}
                        handleChange={handleChange}
                        param={passwordError}
                    />
                </label>
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        required: 'required',
                        placeholder: 'Contraseña'
                    }}
                        handleChange={handleChange}
                    />
                </label>
            </div>

            <button type="submit" className="app-btn small-btn" > Ingresar </button>
       
        </form>
    )
}

const mapDispatchToProps = { 
    setMessageTopCenterOpen, setMessageTopCenter 
}

export default connect(
    null, 
    mapDispatchToProps
)(LoginForm);