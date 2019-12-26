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

const selectStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' ,
        width: '700px',
        height: '70px',
        fontSize: '24px'
    }),

    option: (styles, {isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? 'rgba(189,255,52,0.49)' : isSelected ? '#85C633' : 'white',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#000',
            borderColor: 'none'
        };
    },
};

export const Input = ({input, label, meta: {error}, ...custom}) => {
    const classes = useStyles();
    return (
        <div>
            {error ? <div className={classes.container}>
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
            </div> : <div className={classes.container}>
                <TextField
                    id="outlined-textarea"
                    className={classes.textField}
                    label={custom.fieldName}
                    type={custom.type}
                    margin="normal"
                    variant="outlined"
                    {...input}
                    {...custom}
                />
                {/*<TextField
                    id="outlined-textarea"
                    label={custom.fieldName}
                    className={classes.textField}
                    type={custom.type}
                    multiline
                    margin="normal"
                    variant="outlined"
                    {...input}
                    {...custom}
                />*/}
            </div>}
        </div>
    );
};

export const MySelect = (props) => {
    const {input, options, placeholder} = props;
    return (
        <div className={s.searchContainer}>
            {/*<div className={s.title}>{label}</div>*/}
            <Select
                {...input}
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                options={options}
                placeholder={placeholder}
                styles={selectStyles}
            />
        </div>
    )
};

