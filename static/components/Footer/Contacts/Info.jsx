import React, {Component} from 'react';
import s from './Info.module.css';

const Info = (props) => {
    return (
        <div>
            <h3 className={s.h3}>Контактные данные</h3>
            <div>Телефон: +79153939881</div>
            <div>Почта: hobbyTaste@mail.ru</div>
        </div>);
};

export default Info;