import React, {Component} from 'react';
import s from './Button.module.css';

const Button = (props) => {
    return (
        <div>
            <button className={s.button}>ЗАРЕГЕСТРИРОВАТЬСЯ КАК ПАРТНЕР</button>
        </div>);
};

export default Button;