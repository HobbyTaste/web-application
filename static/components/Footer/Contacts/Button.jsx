import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import style from './Button.module.css';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import {ProviderRegistration} from "../../ProviderRegistration/ProviderRegistration";
import {GreenButton, GreenLargeButton} from "../../Common/MaterialsButtons";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'red'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialogButton = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <div onClick={handleClickOpen} >
                <GreenLargeButton text={"ВХОД ПАРТНЕРА"} />
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <div className={style.header}>
                        <ArrowBackIosIcon style={{fontSize: 40}} className={style.closeButton} onClick={handleClose}/>
                        <div className={style.headerTitle}>Вход в личный кабинет партнера</div>
                        <div className={style.signIn}>
                            <Link to='/provider_cabinet'>
                            <button className={style.partnerLoginBut}>ВОЙТИ</button>
                            </Link>
                        </div>
                    </div>
                </AppBar>
                <div className={style.backgroung}>
                    <div className={style.registrationForm}>
                        <ProviderRegistration />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};