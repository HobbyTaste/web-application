import React, {Component} from 'react';
import style from './../ProviderCabinet.module.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {GreenButton, GreenLargeButton} from "../../Common/MaterialsButtons";
import {ProviderRegistration} from "../../ProviderRegistration/ProviderRegistration";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import AddHobbyFormContainer from "../AddHobbyFormContainer";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogAddHobbyForm = (props) => {
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
            <div className={style.hobbiesContainer}>
                <div className={style.addHobbyButton} onClick={handleClickOpen}>
                    <div className={style.addHobbyText}>Добавить новое хобби</div>
                    <AddCircleOutlineIcon className={style.mdDark} style={{ fontSize: 140 }}/>
                </div>
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <div className={style.header}>
                        <div className={style.headerTitle}>Новое хобби</div>
                        <CloseIcon style={{fontSize: 50}} className={style.closeButton} onClick={handleClose}/>
                    </div>
                </AppBar>
                <AddHobbyFormContainer />
            </Dialog>
        </div>
    );
};