import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../Input';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import axios from 'axios';

const UpdatePasswordForm = (props) => {
    const { callbackPassword, email, authorization, setIsOpen } = props

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
        event.preventDefault();
        
        const update_password_url = "http://127.0.0.1:8000/user/update/password/"
    
        if (newPassword) {
            await axios(
                update_password_url, {
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
                    setIsOpen(false)
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
             
            })
        }
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
            
            <input type="submit" name="Update"  className="app-btn small-btn" value="Modificar" />
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    authorization: state.user.authorization
  };
}

export default connect(mapStateToProps)(UpdatePasswordForm);