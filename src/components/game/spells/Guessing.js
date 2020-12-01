import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, EXECUTE_SPELL, SPELL_QUERY_STRING } from '../../constantsEndpoints';
import { errorTranslate } from '../../errorTranslate';
import adivination from "../../../assets/images/boards/adivination.png";

const useStyles = makeStyles((theme) => ({
    root: {
        border: 0.5,
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 1)',
        color: 'white',
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: 20,
        padding: '3x',
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
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    const classes = useStyles();

    return (
        <button className="SpellButton" onClick={useGuessing} style={{backgroundColor: 'transparent'}} >
            <Avatar alt="Adivinacion" src={adivination} className={classes.root}/>
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