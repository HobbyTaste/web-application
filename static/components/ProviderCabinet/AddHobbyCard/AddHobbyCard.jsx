import React from 'react';
import style from "./AddHobbyCard.module.css";

export const AddHobbyCard = (props) => {
    return(
        <div className={style.card}>
            <div className={style.hobbyName}>{props.organization}</div>
            {props.imageUrl ? <img src={`${props.imageUrl}`} alt=" " className={style.hobbyImage}/>
            : <div />}
            <div className={style.hobbyInfo}>
                <h1 className={style.title}>Контактные данные</h1>
                <ul>
                    <li>Телефон: {props.telephone}</li>
                    <li>Email: {props.email}</li>
                    <li>Сайт: {props.site}</li>
                    <li>Станция метро: {props.metro}</li>
                    <li>Точный адрес: {props.adress}</li>
                </ul>
                <div className={style.emptyCell} />
                <h1 className={style.title}>Краткая информация</h1>
                <div className={style.hobbyTextInfo}>{props.info}</div>
            </div>
        </div>
    );
};