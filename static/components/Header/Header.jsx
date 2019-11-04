import React, {Component} from 'react';
import s from './Header.module.css';
import Logo from "./Logo/Logo";
import User from "./User/User";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}><Logo /></div>
                                        <User />
        </header>);
};

export default Header;