<<<<<<< Updated upstream
import React, { useState } from 'react'
import Input from '../../Input'
import "../../../assets/css/form.css"
import { useHistory } from "react-router-dom";
import axios from 'axios'


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory;
   // const [isLogin, setIsLogin] = useState(false);
   // const [hasError, setHasError] = useState(false);

    function handleChange(name, value) {
        if (name === 'email') {
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
        const formLogin = new FormData()
        formLogin.append("username", email)
        formLogin.append("password", password)
        const result =  await axios("http://127.0.0.1:8000/user/login/", {
            method: 'POST',
            // 'Content-Type': 'multipart/form-data' está dado automaticamente por el uso de FormData (magia)
            headers: {
                'accept': 'application/json'
            },
            data: formLogin
        }).then(response => {
            return response;
           
        }).catch(error => {
            return error
        });

        alert(result)
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

            <input type="submit" name="Login"  className="app-btn small-btn" onClick={() => history.push("/lobby", { from: "Home" })} value="Ingresar" />
       
        </form>
    )

=======
import React,{useState} from 'react'
import "../../../assets/css/LoginForm.css"


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('Datos Ingresados:' +
          '\nNombre de Usuario: ' + username +
          '\nContraseña: ' + pass);
    event.preventDefault();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="email" className='login-email' value={username} required={true} placeholder="Email" onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          <input type="password" className='login-password' value={pass} maxlength={8} required={true} placeholder="Password" onChange={handlePassChange} />
        </label>
      </div>

      <input type="submit" name="Login"  className="app-btn small-btn" value="Ingresar" />
    </form>
  );
>>>>>>> Stashed changes
}

export default LoginForm;