import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {connect} from 'react-redux'
import dropdown from '../../lobby/create/Dropdown'
import {enableSpell} from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));

const AvadaKadavra = (props) => {
    const {gameId, actualMinister, setShowCards, setCrucioLoyalty,
        playersInfo} = props
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
        const avada_url = "http://127.0.0.1:8000/game/"
        const avada_url2 = "/execute_spell?spell=Avada Kedavra"
        await axios.put(avada_url + gameId + avada_url2,{
            minister_id: actualMinister,
            player_id: victim[0].player_id
        }).then(res=>{
            alert(victim[0].username + " asesinado")
            enableSpell({enabledSpell:false})
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
    enableSpell
}

export default connect(mapStateToProps, mapDispatchToProps)(AvadaKadavra);    