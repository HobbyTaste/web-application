import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import style from './ModalWindow.module.css';
import Login from "../Login/Login";

const SimpleModal = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={style.paper}>
                    {/*<h2 id="simple-modal-title">Text in a modal</h2>
                    <p id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>*/}
                    <Login />
                    <SimpleModal />
                </div>
            </Modal>
        </div>
    );
};
export default SimpleModal;
