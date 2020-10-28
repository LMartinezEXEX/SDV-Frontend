import React, { useState } from 'react'
import Input from '../../Input'
import "../../../assets/css/form.css"

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
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
    const handleSubmit = (event) => {
        let account = { email, password }
        if (account) {
            //isMatch(account);
            console.log('account',account);
        }
        event.preventDefault(); // esto VER 
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

//useEffect evitamos que se renderice muchas veces! FIJARSE
