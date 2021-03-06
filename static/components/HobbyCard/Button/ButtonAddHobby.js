import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import style from './Buttons.css';

const useStyles = theme => ({
    root: {},
    button: {
        display: 'flex',
        marginLeft: '0px',
        border: '1px solid #b7b7b7',
        background: '#EDECE8',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
    }
});

const ButtonAddMyHobby = (props) => {
    const classes = useStyles();
    return (<div className={classes.root}>
                <Button style={classes.button} onClick={props.onClick}>
                    <p className={style.text + ' ' + style.textAddMyHobby}>В мои хобби</p>
                    <p className={style.iconNot}><BookmarkBorderIcon/></p>
                </Button>
            </div>
        );
}

export default ButtonAddMyHobby;
