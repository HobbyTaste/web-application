import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 10px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
}));

export const Input = (props) => {
    const classes = useStyles();
    return (
            <div className={classes.container}>
                <TextField
                    id="outlined-textarea"
                    label={props.placeholder}
                    className={classes.textField}
                    placeholder={props.placeholder}
                    multiline
                    margin="normal"
                    variant="outlined"
                    onChange = {props.onChange}
                    value = {props.value}
                />
        </div>
   );
};