import React from 'react';
import CreateGame from './create/CreateGame';
import JoinGame from './join/JoinGame';
import LogOut from './LogOut';
import Profile from './profile/Profile';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const Lobby = (props) => {
    const { username, email, icon } = props
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        small: {
          width: theme.spacing(13),
          height: theme.spacing(13),
        },
    }));

    return (
        <div>
           <div className= "user-profile">
           <Avatar alt="avatar" src={icon} className={useStyles().small} />
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

