import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import "../../../assets/css/form.css";
import "../../../assets/css/buttons.css";
import Input from '../../Input';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../../redux/actions';
import { SERVER_URL, USER_UPDATE_ICON } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const UpdateIconForm = (props) => {
    const { 
        callbackIcon, email, authorization, setIsOpen, 
        setMessageTopCenterOpen, setMessageTopCenter 
    } = props

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
        event.preventDefault()
        
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
                SERVER_URL + USER_UPDATE_ICON, {

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
                
            }).catch(error => {
                if (error.response && error.response.data["detail"] !== undefined) {
                    const error_detail = error.response.data["detail"]
                    if (Array.isArray(error_detail)) {
                        var error_string = ""
                        var field = ""
                        for (var i = 0; i < error_detail.length; i++) {
                            field = error_detail[i]["loc"][(error_detail[i]["loc"].length > 1) + 0]
                            error_string += field + ": " + errorTranslate(error_detail[i]["msg"]) + ((error_detail.length > 1)?"; ":"")
                        }
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: error_string 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    } else {
                        setMessageTopCenter({ 
                            messageSeverity: "warning", 
                            messageTopCenter: errorTranslate(error_detail) 
                        })
                        setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    }
                } else if (error.request) {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: errorTranslate(error.message) 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                } else {
                    setMessageTopCenter({ 
                        messageSeverity: "warning", 
                        messageTopCenter: errorTranslate(error.message) 
                    })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                }
            })
        }
        setIsOpen(false)
    }



    return (
        <form className='profile-container' onSubmit={handleSubmit}>
            <button className="app-btn small-btn">
                <label for="new-icon" className="file-upload"> {(newIcon)?(newIcon.name):("Elegir avatar")} </label>
                <input  id="new-icon" type='file' style={{ display: 'none' }} onChange={handleIconChange}/>
            </button>
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
            <button type="submit" className="app-btn small-btn"> Subir </button>
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    authorization: state.user.authorization
  };
}

const mapDispatchToProps = {
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateIconForm);
