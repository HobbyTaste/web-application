import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import style from './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        background: '#EDECE8',
        border: '1px solid #2F1E0A',
        borderRadius: '6px',
        fontSize: '14px',
        margin: theme.spacing(1),
        width: '135px',
        textDecoration: 'none',
        height: '30px',
    },
    selectEmpty: {
        textDecoration: 'none',
        fontSize: '14px',
    },

    text: {
        background: '#EDECE8',
        fontSize: '14px',
        lineHeight: '16px',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
    }
}));

function Selector(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: 'sort',
    });
    return (
        <FormControl className={classes.formControl}>
            <NativeSelect
                value={state.age}
                onChange={props.handleChange}
                name="sort"
                className={classes.selectEmpty}
                disableUnderline
            >
                <option className={style.option} value="data">&nbsp; По дате</option>
                <option value="distance">&nbsp; По расстоянию</option>
                <option value="rating">&nbsp; По рейтингу</option>
            </NativeSelect>
        </FormControl>
    );
}
export default Selector;
