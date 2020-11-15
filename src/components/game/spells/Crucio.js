import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {connect} from 'react-redux'
import dropdown from '../../lobby/create/Dropdown'
import SelectInput from '@material-ui/core/Select/SelectInput';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));

const Crucio = (props) => {
    const {gameId, actualMinister, setShowCards, setCrucioLoyalty,
            playersInfo} = props
    const classes = useStyles();
    const players_list = playersInfo.map(player=> player.username)
    const [VictimUsername, PlayerDropdown] = dropdown("Investigar a", "",players_list);
    
    const useCrucio = async() => {
        const victim = playersInfo.filter(player => 
            player.username === VictimUsername)
        const crucio_url = "http://127.0.0.1:8000/game/"
        const crucio_url2 = "/execute_spell?spell=Crucio"
        await axios.put(crucio_url + gameId + crucio_url2,{
            minister_id: actualMinister,
            player_id: victim[0].player_id
        }).then(res=>{
            setShowCards(true)
            setCrucioLoyalty(res.data["Fenix loyalty"])
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Crucio);    