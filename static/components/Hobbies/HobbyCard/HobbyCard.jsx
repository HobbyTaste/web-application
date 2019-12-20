import React, {Component} from 'react';
import s from './HobbyCard.module.css';
import {HobbyCardAddButton, SmallHobbyButton} from "../../Common/MaterialsButtons";
import CardImage from "./CardImage/CardImage";

const HobbyCard = (props) => {
    let addNewHobby = () => {
        props.addMyHobby(props.photo, props.name, props.id, props.description);
    };
    return (
        <div className={s.card} key={props.id}>
            <CardImage cardImg={props.photo}/>
            <span className={s.name}>{props.name}</span>
            <ul className={s.ul}>
                <li>Телефон: {props.description.telephone}</li>
                <li>email: {props.description.email}</li>
                <li>Адрес: {props.description.location}</li>
                <li>Информация: {props.description.info}</li>
            </ul>
            <div onClick={addNewHobby}>
                <HobbyCardAddButton text="Добавить в свой кабинет"/>
            </div>
            <div className={s.buttons}>
                <SmallHobbyButton text="Оставить заявку"/>
                <SmallHobbyButton text="Подробнее"/>
            </div>
        </div>
    );
};

export default HobbyCard;