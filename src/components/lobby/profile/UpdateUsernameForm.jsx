import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../Input';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import axios from 'axios';

const UpdateProfileForm = (props) => {
    const { callbackUsername, email, authorization, setIsOpen } = props

    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword ] = useState("");
    
    function handlePasswordChange(name, value) {
        if (name === "password") {
            setPassword(value)
        }
    }

    function handleNewUsernameChange(name, value) {
        if (name === "new-username") {
            setNewUsername(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const update_username_url = "http://127.0.0.1:8000/user/update/username/"
      
    
        if (newUsername) {
            await axios(
                update_username_url, {
                method: "PUT",
                data: {
                    email: email,
                    password: password,
                    new_username: newUsername
                },
                headers: {
                    crossDomain: true,
                    "Authorization": authorization
                }
            }).then(response => {
                if (response.status === 200) {
                    callbackUsername(true, newUsername)
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
                        id: 'new-username',
                        name: 'new-username',
                        type: 'text',
                        placeholder: "Nuevo Username"
                    }}
                        handleChange={handleNewUsernameChange}
                    />
                </label>
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        placeholder: "Contraseña"
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

export default connect(mapStateToProps)(UpdateProfileForm);