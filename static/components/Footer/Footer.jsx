import React, {Component} from 'react';
import s from './Footer.module.css';
import Contacts from "./Contacts/Contacts";
import Feedback from "./Feedback/Feedback";

const Footer = (props) => {
    return (<footer className={s.footer}>
        <Contacts />
        <Feedback />
    </footer>);
};

export default Footer;