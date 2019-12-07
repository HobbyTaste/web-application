import React, {Component} from 'react';
import style from './ProviderCabinet.module.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Link} from 'react-router-dom';
import {DialogAddHobbyForm} from "./DialogAddHobbyForm/DialogAddHobbyForm";

const ProviderCabinet = (props) => {
    return (<div className={style.background}>
        <div className={style.layout}>
            <div className={style.info}>
                <div className={style.imgWrapper}>
                    <div className={style.imgContainer}>
                        <div className={style.img}>
                        </div>
                         </div>
                </div>
            </div>
            <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                    <DialogAddHobbyForm />
            </div>
        </div>
    </div>);
};

export default ProviderCabinet;