import React, {Component} from 'react';
import s from './Button.module.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    return (
        <div>
            <Link to='/provider_registration'>
                <button className={s.button}>ЗАРЕГЕСТРИРОВАТЬСЯ КАК ПАРТНЕР</button></Link>
        </div>);
};

export default Button;