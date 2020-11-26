import React, { useState } from 'react'
import Input from '../../Input'
import "../../../assets/css/form.css"
import axios from 'axios'

const LoginForm = (props) => {
    const { callbackSubmit } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    
    function handleChange(name, value) {
        if (name === 'email' && value.length > 8) {
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
        event.preventDefault();
        
        const profile_url_part_1 = "http://127.0.0.1:8000/user/profile/"
        const profile_url_part_2 = "/"
        const login_url = "http://127.0.0.1:8000/user/login/"

        const formLogin = new FormData()
        formLogin.append("email", email)
        formLogin.append("password", password)

        await axios(login_url, {
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
                (async () => {
                    await axios(profile_url_part_1 + email + profile_url_part_2, {
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
                        callbackSubmit(
                            false,
                            "",
                            "",
                            ""
                        )
                    });
                })()
            }
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
export default LoginForm;