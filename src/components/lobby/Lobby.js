import React from 'react'
//import Title from "../Title";
import CreateGame from './create/CreateGame'
import JoinGame from './join/JoinGame'
import LogOut from './LogOut'
import Profile from './profile/Profile'

const Lobby = (props) => {
    const {username, email} = props
/*
    const getIcon = async() => {
        await axios( "http://127.0.0.1:8000/user/icon" + email, {
            method: "GET",
            headers: {
            'accept': 'application/json'
            }
        })
    }
 */   
    return (
        <div>
           <div className= "user-profile">
               <h3> {username} </h3>
               <h3> {email}  </h3>
           </div>
           <div className="btn-group">
                < Profile />
                < CreateGame />
                < JoinGame />
                < LogOut />
           </div>
        </div>
    );
}

export default Lobby;

