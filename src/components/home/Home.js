import React from 'react';
import { connect } from 'react-redux';
import Title from '../Title';
import SignUp from './register/SignUp';
import LogIn from './login/LogIn';
import '../../assets/css/buttons.css';
import '../../assets/css/form.css';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { setMessageTopCenterOpen, setMessageTopCenter } from '../../redux/actions'; 

const Home = (props) => {
    const { 
        messageTopCenterOpen, messageSeverity, messageTopCenter, 
        setMessageTopCenterOpen, setMessageTopCenter
    } = props

    const handleSnackbarTopCenter = async () => {
        setMessageTopCenter({ messageSeverity: "", messageTopCenter: "" })
        setMessageTopCenterOpen({ messageTopCenterOpen: false })
    }

    return (
        <div>
            <Title name="Secret Voldemort" />
            <div className="btn-group">
                 < SignUp />
                 < LogIn />
            </div>
            {(messageTopCenter.length)
            ?(
                <Snackbar 
                anchorOrigin={{ vertical: "top", horizontal: "center" }} 
                open={messageTopCenterOpen} 
                autoHideDuration={6000}
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

const mapDispatchToProps = {
    setMessageTopCenterOpen, setMessageTopCenter
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Home);