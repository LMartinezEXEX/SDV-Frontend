import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import dropdown from '../../lobby/create/Dropdown';
import { enableSpell, setMessageTopCenter, setMessageTopCenterOpen } from '../../../redux/actions';
import { SERVER_URL, GAME_PATH, SELECT_MM, EXECUTE_SPELL, SPELL_QUERY_STRING } from '../../constantsEndpoints';
import { errorTranslate } from '../../errorTranslate';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));

const Imperius = (props) => {
    const { 
        gameId, playerId, actualMinister, playersInfo, 
        setMessageTopCenter, setMessageTopCenterOpen
    } = props
    
    const classes = useStyles();
    
    let players_list = []
    playersInfo.map(player => {
        if (player.player_id !== actualMinister &&
            player["is alive"] && player.player_id !== playerId) {
                players_list.push(player.username)
        }
    })

    const changeMinister = async () => {
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + SELECT_MM
        ).then(response => {
            if (response.status === 200) {
                console.log(response.data)
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

    const [VictimUsername, PlayerDropdown] = dropdown("Ministro", "",players_list);
    
    const useImperius = async() => {
        const victim = playersInfo.filter(player => 
            player.username === VictimUsername
        )
        
        await axios.put(
            SERVER_URL + GAME_PATH + gameId + EXECUTE_SPELL + SPELL_QUERY_STRING + 'Imperius', {
            minister_id: actualMinister,
            player_id: victim[0].player_id
        }).then(response => {
            if (response.status === 200) {
                enableSpell({ enabledSpell: false })
                setMessageTopCenter({ messageSeverity: "success", messageTopCenter: victim[0].username + " será el próximo ministro" })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
                changeMinister()
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
            <button className="SpellButton" onClick={useImperius}>
                <Avatar className={classes.large}>I</Avatar>
                <h4>Imperio</h4>          
            </button>
                <PlayerDropdown/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        enabledSpell: state.game.enabledSpell,
        gameId: state.game.gameId,
        playerId: state.game.playerId,
        actualMinister: state.game.actualMinister,
        playersInfo: state.game.playersInfo
    };
}

const mapDispatchToProps = {
    enableSpell, setMessageTopCenter, setMessageTopCenterOpen
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Imperius);    