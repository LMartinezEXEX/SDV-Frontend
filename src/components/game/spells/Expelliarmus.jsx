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

const Expelliarmus = () => {
    const classes = useStyles();

    return (
            <button className="SpellButton" >
                <Avatar className={classes.large}>A</Avatar>
                <h4>Aceptar</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Expelliarmus);  