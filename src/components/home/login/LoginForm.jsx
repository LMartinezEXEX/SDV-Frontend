import React, { useState } from 'react';
import Input from '../../Input';
import "../../../assets/css/form.css";
import axios from 'axios';

const LoginForm = (props) => {
    const { callbackSumbit } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    function handleChange(name, value) {
        if (name === 'email' && value.length > 10) {
            setEmail(value)
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
        let account = { email, password }
        if (account) {
            console.log('account', account);
        }
        event.preventDefault();
        
        const formLogin = new FormData()
        formLogin.append("email", email)
        formLogin.append("password", password)
        await axios("http://127.0.0.1:8000/user/login/", {
            method: "POST",
            data: formLogin,
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            }
        }).then(response => {
            console.log("Response", response.status);
            console.log("Response", response.data);
            alert(response.headers["authorization"])
            callbackSumbit(true, response.headers["authorization"])
        }).catch(error => {
            if (error.response) {
                alert(JSON.stringify(error.response.data));
                console.log("Error (response)", error.response.status);
                console.log("Error (response)", error.response.headers);
                console.log("Error (response)", error.response.data);
            } else if (error.request) {
                alert(JSON.stringify(error.request));
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            alert(error)
        });
    }
    
    return (
        
        <form className='login-container' onSubmit={handleSubmit}>
            <div> {/* COMMENT 
                { hasError &&
                    <label>
                        Su contraseña o usuario son incorrectos,
                        o no existen en nuestra plataforma
                    </label>
                }*/}
                <label >
                    <Input attribute={{
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        required: 'true',
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
                        required: 'true',
                        placeholder: 'Contraseña'
                    }}
                        handleChange={handleChange}
                    />
                </label>
            </div>

            <input type="submit" name="Login"  className="app-btn small-btn" value="Ingresar" />
       
        </form>
    )

}
export default LoginForm;