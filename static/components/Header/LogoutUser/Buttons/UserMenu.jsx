import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import style from '../../Header.module.css'
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'flex',
        border: '1px solid #2F1E0A',
        height: '30px',
        boxShadow: 'none',
        margin: '5px 0px',
        background: '#EDECE8',
        color: '#034488',
        borderRadius: '4px',
        padding: '0px 10px',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        letterSpacing: '0.16px',
        textAlign: 'center',
        lineHeight: '18px',
        textTransform: 'none',
    },
    menuItem: {
        padding: '13px 0px',
        height: '46px',
        display: 'flex',
        paddingLeft: '16px',
    },
    menuItemExit: {
        padding: '0px 0px',
        height: '46px',
        display: 'flex',
    },
    content: {
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#034488',

    },
    buttonExit: {
        display: 'flex',
        justifyContent: 'left',
        padding: '13px 0',
        paddingLeft: '16px',
        textAlign: 'left',
        textTransform: 'none',
        width: '100%',
    },
}));

const StyledMenu = withStyles({
    paper: {
        marginTop: '5px',
        height: '154px',
        width: '116px',
        background: '#fff',
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.14)',
        borderRadius: '4px',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export default function UserMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={style.nameContainer}>
            <Button aria-controls="simple-menu" onClick={handleClick} className={classes.button} >  {props.name}
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} className={classes.menuItem}> <Link to='/search/sport' className={classes.content} >Кабинет</Link></MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItem}>  <Link to='/' className={classes.content} >Мои хобби</Link></MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuItemExit}>  <Button onClick={props.logout} className={classes.buttonExit +' '+ classes.content}>Выход</Button></MenuItem>
            </StyledMenu>
        </div>
    );
}
