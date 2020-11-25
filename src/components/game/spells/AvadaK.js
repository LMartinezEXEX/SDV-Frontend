import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import dropdown from '../../lobby/create/Dropdown';
import { enableSpell, setMessageTopCenter, setMessageTopCenterOpen } from "../../../redux/actions";
import { SERVER_URL, GAME_PATH, EXECUTE_SPELL, SPELL_QUERY_STRING } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));

const AvadaKadavra = (props) => {
    const {
        gameId, actualMinister, playersInfo,
        enableSpell, setMessageTopCenter, setMessageTopCenterOpen 
    } = props
    
    const classes = useStyles();
    
    let players_list = []
    playersInfo.map(player => {
        if (player["is alive"] && player.player_id !== player) {
                players_list.push(player.username)
        }
    })

    const [VictimUsername, PlayerDropdown] = dropdown("Asesinar a", "",players_list);
    
    const useAvada = async() => {
        const victim = playersInfo.filter(player => 
            player.username === VictimUsername)
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + EXECUTE_SPELL + SPELL_QUERY_STRING + 'Avada Kedavra',{
            minister_id: actualMinister,
            player_id: victim[0].player_id
        }).then(response => {
            if (response.status === 200) {
                enableSpell({ enabledSpell: false })
                setMessageTopCenter({ messageSeverity: "success", messageTopCenter: victim[0].username + " asesinado" })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        }).catch(error => {
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ messageSeverity: "warning", messageTopCenter: errorTranslate(error.response.data["detail"]) })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            }
        })
    }

    return (
        <>
            <button className="SpellButton" onClick={useAvada}>
                <Avatar className={classes.large}>AK</Avatar>
                <h4>Avada Kedabvra</h4>          
            </button>
                <PlayerDropdown/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        gameId: state.game.gameId,
        actualMinister: state.game.actualMinister,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    enableSpell,
    setMessageTopCenter, setMessageTopCenterOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(AvadaKadavra);    