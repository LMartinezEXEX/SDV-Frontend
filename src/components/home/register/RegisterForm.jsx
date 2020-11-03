import React, { useState } from 'react'
import Input from '../../Input'
import axios from 'axios';


const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(0);
    const [passwordError, setPasswordError] = useState(false);
    // const [hasError, setHasError] = useState(false);

    const avatars = ["Harry","Ron","Hermione","Snape","Draco","Lucius","Umbridge","Voldemort"]

    function handleChange(name, value) {
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'username') {
            setUsername(value)
        } else {
            if (value.length < 8) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    }

    /*function isMatch(param) {
        if (param.email.length > 0 && param.password > 0) {
            if (param.email === 'sopa@verduras' && param.password === '1234') {
                const { email, password } = param;
                let ac = { email, password }
                let account = JSON.stringify(ac);
                localStorage.setItem('account', account);
              //  setIsLogin(true);
            } else {
                //setIsLogin(false);
                setHasError(true);
            }
            //setIsLogin(false);
            setHasError(true);
        }
    }
    */
    const handleSubmit = async (event) => {
        let account = { email, username, password, avatar }
        if (account) {
            //isMatch(account);
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
                password: password
            }
        }).then(response => {
            if (response.status === 201) {
                alert("Registro echo con exito")
            } else {
                alert("No se pudo realizar el registro, corroborar la informacion ingresada")
            }
        }).catch(error => {
            if (error.response) {
                alert(error.response.data);
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
                <div> {/* COMMENT 
                    { hasError &&
                        <label>
                            Su contraseña o usuario son incorrectos,
                            o no existen en nuestra plataforma
                        </label>
                    }*/}
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
                    Avatar: {avatars[avatar]}
                </div>

                <input type="submit" name="Register"  className="app-btn small-btn" value="¡Registrate!" />
           
            </form>

            <div>
                <button className="harry" onClick={() => setAvatar(0)} />
                <button className="ron" onClick={() => setAvatar(1)} />
                <button className="hermione" onClick={() => setAvatar(2)} />
                <button className="snape" onClick={() => setAvatar(3)} />
            <div>
            </div>
                <button className="draco" onClick={() => setAvatar(4)} />
                <button className="lucius" onClick={() => setAvatar(5)} />
                <button className="umbridge" onClick={() => setAvatar(6)} />
                <button className="voldemort" onClick={() => setAvatar(7)} />
            </div>

        </div>
    )
}

export default RegisterForm;

//useEffect evitamos que se renderice muchas veces! FIJARSE

