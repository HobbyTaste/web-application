import React, {Component} from 'react';
import style from './Header.module.css';
import Logo from "./Logo/Logo";
import FilterList from './Search/FilerList/FilterList';
import LoginUser from "./LoginUser/LoginUser";
import LogoutUser from "./LogoutUser/LogoutUser";
import {Link} from 'react-router-dom';
import FilteredList from './Search/FilerList/FilterList';

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logoContainer}>
                <Link to='/'>
                <Logo setIsUserInCabinet={props.setIsUserInCabinet}/>
                </Link>
            </div>
            <div className={style.searchContainer}>
                <FilteredList/>
            </div>
          { props.isAuth
                ? <div className={style.buttonContainer}><LogoutUser logout={props.logout} name= {props.name} /></div>
                : <div className={style.buttonContainer}><LoginUser/></div> }

        </header>);
};

export default Header;
