import React, {Component} from 'react';
import s from './Contacts.module.css';
import Info from "./Info";
import {FullScreenDialogButton} from "./Button";

const Contacts = (props) => {
    return (
        <div className={s.contacts}>
            <Info />
            <FullScreenDialogButton />
        </div>);
};

export default Contacts;