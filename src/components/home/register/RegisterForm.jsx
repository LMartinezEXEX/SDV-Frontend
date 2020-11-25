import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../Input';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_REGISTER } from '../../constantsEndpoints';
import { errorTranslate, errorConcat } from '../../errorTranslate';

const RegisterForm = (props) => {
    const { setIsOpen, setMessageTopCenterOpen, setMessageTopCenter } = props
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_verify, setPasswordverify ] = useState('');
    const [passwordError, setPasswordError]     = useState(false);
    
    function handleChange(name, value) {
        if (name === 'email') {
            if (value.length < 10) {
                setEmail('')
            } else {
                setEmail(value)
            }
        } else if (name === 'username') {
            if (value.length < 5) {
                setUsername('')
            } else {
                setUsername(value)
            }
        } else if (name === 'password_verify') {
            if (value.length < 8) {
                setPasswordverify('')
                setPasswordError(true)
            } else {
                setPasswordverify(value)
                setPasswordError(false)
            }
        } else {
            if (value.length < 8) {
                setPassword('')
                setPasswordError(true)
            } else {
                setPassword(value)
                setPasswordError(false)
            }
        }
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault()

        await axios(
            SERVER_URL + USER_REGISTER, {
            method: 'POST',
            headers: {
                'accept': 'application/json'
            },
            data: {
                email: email,
                username: username,
                password: password,
                password_verify: password_verify
            }
        }).then(response => {
            if (response.status === 201) {
                setTimeout(() => {
                    setMessageTopCenter({ 
                        messageSeverity: "success", 
                        messageTopCenter: "Registro exitoso" 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                }, 500)
                setIsOpen(false)
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
            setIsOpen(false)
        })
    }

    
    return (
        <div>
            <form className='register-container' onSubmit={handleSubmit}>
                <div> 
                    <label>
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
                    <label>
                        <Input attribute={{
                            id: 'username',
                            name: 'username',
                            type: 'text',
                            required: 'required',
                            placeholder: 'Username'
                        }}
                            handleChange={handleChange}
                        />

                    </label>
                </div>
                <div>
                    <label>
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
                <div>
                    <label>
                        <Input attribute={{
                            id: 'password_verify',
                            name: 'password_verify',
                            type: 'password',
                            required: 'required',
                            placeholder: 'Confirmar contraseña'
                        }}
                            handleChange={handleChange}
                        />

                    </label>
                </div>

                <button type="submit" className="app-btn small-btn"> ¡Registrate! </button>
           
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterForm);