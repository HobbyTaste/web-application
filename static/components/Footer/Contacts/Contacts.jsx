import React, {Component} from 'react';
import s from './Contacts.module.css';
import Info from "./Info";
import Button from "./Button";

const Contacts = (props) => {
    return (
        <div className={s.contacts}>
            <Info />
            <Button />
        </div>);
};

export default Contacts;