import React from 'react'
//import Title from "../Title";
import CreateGame from './create/CreateGame'
import JoinGame from './join/JoinGame'
import UpdateProfile from './profile/UpdateProfile'

const Lobby = (props) => {
    const {username, email} = props
    
    return (
        <div>
           <div className= "user-profile">
               <h3> {username} </h3>
               <h3> {email}  </h3>
           </div>
           <div className="btn-group">
                < UpdateProfile />
                < CreateGame />
                < JoinGame />
           </div>
        </div>
    );
}

export default Lobby;

