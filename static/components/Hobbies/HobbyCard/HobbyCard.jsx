import React, {Component} from 'react';
import s from './HobbyCard.module.css';

const HobbyCard = (props) => {
    return (
        <div className={s.card} key={props.id}>
            <img src={props.photo} alt="" />
            <span className={s.name}>{props.name}</span>
            <ul>
                <li>Телефон: {props.description.telephone}</li>
                <li>email: {props.description.email}</li>
                <li>Адрес: {props.description.location}</li>
                <li>Информация: {props.description.info}</li>
            </ul>
            <button className={s.add}>Добавить в свой кабинет</button>
            <div className={s.buttons}>
                <button className={s.button}>Оставить заявку</button>
                <button className={s.button}>Подробнее</button>
            </div>
        </div>
    );
};

export default HobbyCard;