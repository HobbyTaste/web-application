import React, {Component} from 'react';
import s from './UserHobbyCard.module.css';
import {HobbyCardAddButton, SmallHobbyButton} from "../../Common/MaterialsButtons";
import CardImage from "./../../Hobbies/HobbyCard/CardImage/CardImage";

const UserHobbyCard = (props) => {
    let deleteHobby = () => {
        props.delete(props.id);
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
            <div onClick={deleteHobby}>
                <HobbyCardAddButton text="Удалить хобби"/>
            </div>
            <div className={s.buttons}>
                <SmallHobbyButton text="Оставить заявку"/>
                <SmallHobbyButton text="Подробнее"/>
            </div>
        </div>
    );
};

export default UserHobbyCard;