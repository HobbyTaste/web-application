import React, {Component} from 'react';
import s from './Header.module.css';
import Logo from "./Logo/Logo";
import LoginUser from "./LoginUser/LoginUser";
import LogoutUser from "./LogoutUser/LogoutUser";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}><Logo /></div>
            { props.isAuth
                ? <div className={s.tmp}><LogoutUser logout={props.logout}/></div>
                : <div className={s.tmp}><LoginUser /></div> }

        </header>);
};

export default Header;