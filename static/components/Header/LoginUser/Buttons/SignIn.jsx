import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';
import Modal from '@material-ui/core/Modal';
import style from './../../../ModalWindow/ModalWindow.module.css';
import Login from "../../../Login/Login"

const SignIn = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return ( /*<div> <button className={s.headerButtons}>ВОЙТИ</button> </div>*/
        <div>
            <button type="button" onClick={handleOpen} className={s.headerButtons}>
                ВОЙТИ
            </button>
            <Modal
                open={open}
                onClose={handleClose}>
                <div className={style.paper}>
                    <Login />
                </div>
            </Modal>
        </div>
    );
};

export default SignIn;



