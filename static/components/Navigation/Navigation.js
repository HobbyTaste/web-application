import React, {Component} from 'react';
import style from './Navigation.css';
import Button from  './Button/Button';
import {Link} from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav className={style.navSite}>
            <Button/>
            <ul className={style.menu}>
                <li><a href="/">КАТЕГОРИЯ 1</a></li>
                <li><a href="/">КАТЕГОРИЯ 2</a></li>
                <li><a href="/">КАТЕГОРИЯ 3</a></li>
                <li><a href="/">КАТЕГОРИЯ 4</a></li>
                <li><a href="/">КАТЕГОРИЯ 5</a></li>
                <li><a href="/">КАТЕГОРИЯ 6</a></li>
            </ul>
        </nav>

    );
};

export default Navigation;
