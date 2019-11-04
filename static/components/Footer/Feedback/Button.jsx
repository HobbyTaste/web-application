import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from './Button.module.css'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

export default function ContainedButtons() {
    const classes = useStyles();

    return (
        <div className={s.wrapButton}>
            <Button variant="contained" color="secondary" className={classes.button}>
                ОСТАВИТЬ ОТЗЫВ
            </Button>
        </div>
    );
}


/*import React, {Component} from 'react';
import s from './Button.module.css';

export default function ContainedButtons() {
    return (
        <div>
            <button className={s.button}>
                ОСТАВИТЬ ОТЗЫВ
            </button>
        </div>
    );
}*/

/*

const Button = (props) => {
    return ( <div>
            <button className={s.button}>ОСТАВИТЬ ОТЗЫВ</button>
        </div>
    );
};

export default Button;*/
