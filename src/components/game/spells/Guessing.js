import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin:15,
    },
}));

const Guessing = () => {
    const classes = useStyles();

    return (
        <button className="SpellButton">
            <Avatar className={classes.large}>A</Avatar>
            <h4>Adivinacion</h4>          
        </button>
    )
}

export default Guessing
