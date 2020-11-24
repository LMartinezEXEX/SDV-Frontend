import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../Input';
import '../../../assets/css/form.css';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_LOGIN, USER_PROFILE } from '../../constantsEndpoints';

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
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: "No se pudo loguear al usuario" })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.response) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: error.message })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.request) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: error.message })
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
            console.log("Response", response.status);
            console.log("Response", JSON.stringify(response.data));
            const authorization = response.headers["authorization"]
            if (response.status === 200 && authorization) {
                console.log("Logueado exitosamente")
                getProfile(email, authorization)
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: error.message })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else if (error.response) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: error.message })
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

            <input type="submit" name="Login"  className="app-btn small-btn"  value="Ingresar" />
       
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