import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import dropdown from '../../lobby/create/Dropdown';
import { setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { playersUsernamesListExcluding } from '../gameAuxiliars';
import { SERVER_URL, GAME_PATH, EXECUTE_SPELL, SPELL_QUERY_STRING } from '../../constantsEndpoints';
import { errorTranslate } from '../../errorTranslate';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));

const Crucio = (props) => {
    const { 
        gameId, actualMinister, setShowCards, setCrucioLoyalty, playersInfo, 
        setMessageTopCenter, setMessageTopCenterOpen 
    } = props
    
    const classes = useStyles();
    
    const players_list = playersUsernamesListExcluding(playersInfo, actualMinister)
    
    const [VictimUsername, PlayerDropdown] = dropdown("Investigar a", "",players_list);
    
    const useCrucio = async() => {
        const victim = playersInfo.filter(player => 
            player.username === VictimUsername
        )
        
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + EXECUTE_SPELL + SPELL_QUERY_STRING + 'Crucio',{
            minister_id: actualMinister,
            player_id: victim[0].player_id
        }).then(res=>{
            setShowCards(true)
            setCrucioLoyalty(res.data["Fenix loyalty"])
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    return (<>
        <button className="SpellButton" onClick={useCrucio}>
            <Avatar className={classes.large}>C</Avatar>
            <h4>Crucio</h4>
        </button>
            <PlayerDropdown/>
    </>)
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        actualMinister: state.game.actualMinister,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    setMessageTopCenter, setMessageTopCenterOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(Crucio);    