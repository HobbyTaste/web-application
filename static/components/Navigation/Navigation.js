import React, {Component} from 'react';
import style from './Navigation.css';
import Button from  './Button/Button';
import {Link} from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav className={style.navSite}>
            <Button/>
            <ul className={style.menu}>
                <li><a href="/">РИСОВАНИЕ</a></li>
                <li><a href="/">МУЗЫКА</a></li>
                <li><a href="/">СПОРТ</a></li>
                <li><a href="/">ЕДИНОБОРСТВА</a></li>
                <li><a href="/">ТАНЦЫ</a></li>
                <li><a href="/">ДРУГОЕ</a></li>
            </ul>
        </nav>

    );
};

export default Navigation;
