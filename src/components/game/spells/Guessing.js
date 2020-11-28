import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, EXECUTE_SPELL, SPELL_QUERY_STRING } from '../../constantsEndpoints';
import { errorTranslate } from '../../errorTranslate';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin:15,
    },
}));

const Guessing = (props) => {
    const { 
        gameId, playerId, setCards, setshowCards, 
        setMessageTopCenter, setMessageTopCenterOpen 
    } = props

    const useGuessing = async() => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + EXECUTE_SPELL + SPELL_QUERY_STRING + 'Guessing', {
            minister_id: playerId,
            player_id: 0
        }).then(res => {
            setshowCards(true)
            setCards(res.data.cards)
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const classes = useStyles();

    return (
        <button 
                className="SpellButton" onClick={useGuessing}>
            <Avatar className={classes.large}>A</Avatar>
            <h4>Adivinacion</h4>          
        </button>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Guessing);    