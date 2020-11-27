import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux'
import { setMessageTopCenter, setMessageTopCenterOpen, expelliarmusUsed } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, MINISTER_EXPELLIARMUS} from '../../constantsEndpoints';


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
        setMessageTopCenter, setMessageTopCenterOpen,
        expelliarmusUsed
    } = props
    const classes = useStyles();
    
    const decitionExpelliarmus = async(decition) => {
        const msj = decition? "Aceptado":"Rechazado"
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + MINISTER_EXPELLIARMUS,
            {
                minister_id: playerId,
                consent: decition
            }).then(response => {
                if (response.status === 200) {
                    setMessageTopCenter({ messageSeverity: "success", messageTopCenter: "Expelliarmus" + msj })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    expelliarmusUsed()
                }
            }) .catch(response => {
                if (response.status === 200) {
                    setMessageTopCenter({ messageSeverity: "success", messageTopCenter: "Expelliarmus" + msj })
                    setMessageTopCenterOpen({ messageTopCenterOpen: true })
                    expelliarmusUsed()
                }
            }   
            )
    }
    
    if(option==="Acept"){
        return (
                <button className="SpellButton" onClick={()=>decitionExpelliarmus(true)} >
                    <Avatar className={classes.large}>A</Avatar>
                    <h4>Aceptar</h4>
                </button>
        )
    } else{
        return (
                <button className="SpellButton" onClick={()=>decitionExpelliarmus(false)}>
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
        actualMinister: state.game.actualMinister,
    };
}

const mapDispatchToProps = {
    setMessageTopCenter, setMessageTopCenterOpen,
    expelliarmusUsed
};

export default connect(mapStateToProps, mapDispatchToProps)(Expelliarmus);  