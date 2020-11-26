import React from 'react';
import { connect } from 'react-redux';
import CreateGame from './create/CreateGame';
import JoinGame from './join/JoinGame';
import LogOut from './LogOut';
import Profile from './profile/Profile';
import Alert from '@material-ui/lab/Alert';
import { Snackbar, Avatar, makeStyles } from '@material-ui/core';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../redux/actions';

const Lobby = (props) => {
    const { 
      username, email, icon, 
      messageTopCenterOpen, messageSeverity, messageTopCenter, 
      setMessageTopCenterOpen, setMessageTopCenter 
    } = props
    
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
  
    const handleSnackbarTopCenter = async () => {
      setMessageTopCenter({ messageSeverity: "", messageTopCenter: "" })
      setMessageTopCenterOpen({ messageTopCenterOpen: false })
    }

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
          {(messageTopCenter.length)
          ?(
            <Snackbar 
            anchorOrigin={{ vertical: "top", horizontal: "center" }} 
            open={messageTopCenterOpen} 
            autoHideDuration={5000}
            onClose={() => handleSnackbarTopCenter()}
            onExit={() => handleSnackbarTopCenter()}
            >
              <Alert variant="filled" severity={messageSeverity}>{messageTopCenter}</Alert>
            </Snackbar>
          ):(<></>)
          }
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
      messageTopCenterOpen: state.notifications.messageTopCenterOpen,
      messageSeverity: state.notifications.messageSeverity,
      messageTopCenter: state.notifications.messageTopCenter
  }
}

const mapDispatchToProps =  { 
  setMessageTopCenterOpen, setMessageTopCenter 
} 

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Lobby);