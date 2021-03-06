import React, {Component} from 'react';
import style from './UserCabinet.module.css';
import Button from '../Navigation/Button/Button';
import {Link} from 'react-router-dom';

const UserCabinetNavigation = (props) => {
    return (
        <nav className={style.navigation}>
            <Button/>
            <ul className={style.menu}>
                <Link className={`${style.menuPoint} ${props.isActive === 0 ? style.activeCategory : style.passiveCategory}`} to="/user/cabinet">ПРОФИЛЬ</Link>
                <Link className={`${style.menuPoint} ${props.isActive === 1 ? style.activeCategory : style.passiveCategory}`} to="/user/cabinet/hobbies">ИЗБРАННОЕ</Link>
            </ul>
        </nav>

    );
};

export default UserCabinetNavigation;
