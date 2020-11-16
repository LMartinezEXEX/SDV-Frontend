import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin:15,
    },
}));


const Guessing = (props) => {
    const {gameId, actualMinister, setCards, setshowCards} = props

    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/select_MM")
        .then(res => {
        })
    }

    const useGuessing = async() => {
        const useSpell_url_part1 = "http://127.0.0.1:8000/game/"
        const useSpell_url_part2 = "/execute_spell?spell=Guessing"
        await axios.put(useSpell_url_part1 + gameId + 
                        useSpell_url_part2, {
            minister_id: actualMinister,
            player_id: 0
        }).then(res => {
            setshowCards(true)
            setCards(res.data.cards)
            changeMinister()
        }).catch(error => alert(error))
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
        actualMinister: state.game.actualMinister,
    };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Guessing);    