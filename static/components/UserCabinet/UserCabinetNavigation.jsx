import React, {Component} from 'react';
import style from './UserCabinet.module.css';
import Button from '../Navigation/Button/Button';
import {Link} from 'react-router-dom';

const UserCabinetNavigation = (props) => {
    return (
        <nav className={style.navigation}>
            <Button/>
            <ul className={style.menu}>
                <a className={style.menuPoint} href="/user/cabinet">ПРОФИЛЬ</a>
                <a className={style.menuPoint} href="/user/cabinet/hobbies">ИЗБРАННОЕ</a>
            </ul>
        </nav>

    );
};

export default UserCabinetNavigation;
