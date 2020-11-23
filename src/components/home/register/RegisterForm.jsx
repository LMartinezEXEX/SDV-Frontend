import React, { useState } from 'react'
import Input from '../../Input'
import axios from 'axios';


const RegisterForm = (props) => {
    const { setIsOpen } = props
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_verify, setPasswordverify ] = useState('');
    const [passwordError, setPasswordError] = useState(false);
   
    function handleChange(name, value) {
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'username') {
            setUsername(value)
        } else if (name === 'password_verify') {
            setPasswordverify(value)
        } else {
            if (value.length < 8) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    }

    
    const handleSubmit = async (event) => {
        let account = { email, username, password, password_verify }
        if (account) {
            console.log('account',account);
        }
        event.preventDefault();

        await axios("http://127.0.0.1:8000/user/register/", {
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
                alert("Registro hecho con éxito")
                setIsOpen(false)
            }
        }).catch(error => {
            if (error.response) {
                alert("Error, verifique los datos ingresados");
                console.log("Error (response)", error.response.status);
                console.log("Error (response)", error.response.headers);
                console.log("Error (response)", error.response.data);
            } else if (error.request) {
                alert(error.request);
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            // setHasError(true)
        });
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

                <input type="submit" name="Register"  className="app-btn small-btn" value="¡Registrate!"  />
           
            </form>
        </div>
    )
}

export default RegisterForm;
