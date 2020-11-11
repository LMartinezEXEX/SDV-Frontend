import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: 15
    },
}));


const Crucio = () => {
    const classes = useStyles();

    return (
        <button className="SpellButton">
            <Avatar className={classes.large}>C</Avatar>
            <h4>Crucio</h4>          
        </button>
    )
}

export default Crucio
