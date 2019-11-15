import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Select from 'react-select';
import s from "../../MainPage/SearchContent/Search/Search.module.css";

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

export const Input = ({ input, label, meta: { error }, ...custom }) => {
    const classes = useStyles();
    return (
        <div>
            { error ? <div className={classes.container}>
                <div>
                    <TextField
                        error id="outlined-error-helper-text"
                        label={error}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        errortext={error}
                        {...input}
                        {...custom}
                    />
                </div>
            </div> : <div className={classes.container}>

                <TextField
                    id="outlined-password-input"
                    label={label}
                    className={classes.textField}
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    {...input}
                    {...custom}
                />
            </div>}
        </div>
   );
};

export const MySelect = (props) => {
    const { input, options, label } = props;
    return (
        <div className={s.searchContainer}>
            <div className={s.title}>{label}</div>
        <Select
            {...input}
            onChange={value => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            options={options}
        />
        </div>
    )
};

