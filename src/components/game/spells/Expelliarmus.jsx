import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, MINISTER_EXPELLIARMUS} from '../../constantsEndpoints';
import { errorTranslate } from '../../errorTranslate';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin:15,
    },
}));

const Expelliarmus = (props) => {
    const {
        option, gameId, playerId,
        setMessageTopCenter, setMessageTopCenterOpen
    } = props
    
    const classes = useStyles();
    
    const decisionExpelliarmus = async (decision) => {
        const message = decision? "Aceptado":"Rechazado"
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + MINISTER_EXPELLIARMUS,
        {
            minister_id: playerId,
            consent: decision
        }).then(response => {
            if (response.status === 200) {
                setMessageTopCenter({ 
                    messageSeverity: "success", 
                    messageTopCenter: "Expelliarmus " + message 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }
    
    if (option === "Accept") {
        return (
            <button className="SpellButton" onClick={()=>decisionExpelliarmus(true)} >
                <Avatar className={classes.large}>A</Avatar>
                <h4>Aceptar</h4>
            </button>
        )
    } else {
        return (
            <button className="SpellButton" onClick={()=>decisionExpelliarmus(false)}>
                <Avatar className={classes.large}>R</Avatar>
                <h4>Rechazar</h4>
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        playerId: state.game.playerId,
    };
}

const mapDispatchToProps = {
    setMessageTopCenter, setMessageTopCenterOpen
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Expelliarmus);