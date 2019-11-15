import React, {Component} from 'react';
import s from '../../components/Header/HeaderButtons.module.css';
import Modal from '@material-ui/core/Modal';
import style from './ModalWindow.module.css';

export const withModalWindow = (Component) => {
    let WrapperContainer = (props) => {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        return (
            <div>
                <button type="button" onClick={handleOpen} className={s.headerButtons}>
                    {props.buttonName}
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}>
                    <div className={style.paper}>
                        <Component {...props}/>
                    </div>
                </Modal>
            </div>
        );
    };
    return (WrapperContainer);
};