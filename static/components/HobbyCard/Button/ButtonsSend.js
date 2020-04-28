import style from './Buttons.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    buttonSend:{
        margin: '0px 8px',
        display: 'flex',
        marginLeft: '0px',
        border: '1px solid #807466',
        background: '#EDECE8;',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
        minWidth: '115px'
    },

}));

export default function ButtonsSend(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button type={props.type} className={classes.buttonSend}><p className={style.text}>Отправить</p> </Button>
        </div>
    );
}
