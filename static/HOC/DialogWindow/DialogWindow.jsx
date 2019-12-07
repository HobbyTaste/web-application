import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import {ProviderRegistration} from "../../components/ProviderRegistration/ProviderRegistration";
import style from "../../components/ProviderRegistration/ProviderRegistration.module.css";
import {CommonButton} from "../../components/Common/CommonButton";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialog = (props) => {
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                        <div className={style.header}>
                            <div className={style.headerTitle}>Вход в личный кабинет партнера</div>
                            <div className={style.signIn}>
                                <div onClick={handleClose} edge="start" aria-label="close">
                                <CommonButton text={"ВОЙТИ"}>ВОЙТИ</CommonButton>
                                </div>
                            </div>
                        </div>
                </AppBar>
                <ProviderRegistration />
            </Dialog>
        </div>
    );
};