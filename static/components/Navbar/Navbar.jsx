import React, {Component} from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/main_page" activeClassName={s.activeLink}>Main_page</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/new_hobby" activeClassName={s.activeLink}>New_hobby</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/provider_cabinet" activeClassName={s.activeLink}>Provider_cabinet</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/user_cabinet" activeClassName={s.activeLink}>User_cabinet</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;