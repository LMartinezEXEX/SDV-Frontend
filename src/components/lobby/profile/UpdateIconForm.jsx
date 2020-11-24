import React, { useState } from 'react';
import { connect } from 'react-redux';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import Input from '../../Input';
import axios from 'axios';

const UpdateIconForm = (props) => {
    const { callbackIcon, email, authorization, setIsOpen} = props

    const [password, setPassword ] = useState("");
    const [newIcon, setNewIcon] = useState(null);
  
    function handlePasswordChange(name, value) {
        if (name === "password") {
            setPassword(value)
        }
    }

    function handleIconChange(event) {
        setNewIcon(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const update_icon_url = "http://127.0.0.1:8000/user/update/icon/"      
        if (newIcon) {
            const formData = new FormData()
            formData.append("email", email)
            formData.append("password", password)
            formData.append(
              "new_icon",
              newIcon,
              newIcon.name
            )
            await axios(
                update_icon_url, {
                method: "PUT",
                data: formData,
                headers: {
                    crossDomain: true,
                    "Authorization": authorization
                }
            }).then(response => {
                if (response.status === 200) {
                    callbackIcon(true, email)
                }
                setIsOpen(false)
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
                <label className="file-upload"> Subir avatar </label>
                <input  id="new-icon" type='file' onChange={handleIconChange}/>
                
            </div>
            <div>
                <label >
                    <Input attribute={{
                        id: 'password',
                        name: 'password',
                        type: 'password',
                        required: 'required',
                        placeholder: "Contraseña"
                    }}
                        handleChange={handlePasswordChange}
                    />
                </label>
            </div>
            <input type="submit" name="Update"  className="app-btn small-btn" value="Subir" />
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    authorization: state.user.authorization
  };
}

export default connect(mapStateToProps)(UpdateIconForm);
