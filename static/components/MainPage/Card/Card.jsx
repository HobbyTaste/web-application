import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HalfRating from '../../Common/FeedbackStatistic';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
/*времено, чтобы передалвался массив комментариев*/
const comments =  [{
    idComment: 1,
    userId: 1,
    text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    nameWriter: 'Азалия',
    date: '28.12.2020',
    stars: 2,
    answer: {
        providerId: 1,
        text: 'Спасибо за ваш отзыв! ',
        nameWriter: 'Имя парнера',
        date: '15.04.2020',
    }
},
    {
        idComment: 2,
        userId: 2,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 3,
        answer: null,
    },
    {
        idComment: 3,
        userId: 2,
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Имя',
        date: '28.12.2020',
        stars: 5,
        answer: { providerId: 2,
            text: 'Спасибо за ваш отзыв! бла бла бла',
            nameWriter: 'Имя парнера2',
            date: '16.04.2020'
        }
    }]

const Card = (props) => (<div>
    <span className={style.card}>
        <span className={style.cardDescription}>
            <div className={style.cardHeader}>
                <span className={`${style.name} ${style.colorWhiteCard}`}>{props.name}</span>
                <HalfRating isUserAuth = {props.isUserAuth}/>
            </div>
            <span className={style.icon}><MoreHorizIcon style={{ color: '#FFFFFF' }}/></span>
            <div className={`${style.metro} ${style.colorBlueCard}`}>
                <LocationOnIcon style={{ color: '#178FD6', fontSize: 'small' }} /> {props.metro}
            </div>
            <div className={`${style.address} ${style.colorGrayCard}`}>{props.address}</div>
            {props.isUserAuth
                ? (props.isProviderAuth ? <span className={style.icon}><MonetizationOnIcon style={{ color: '#FFFFFF', fontSize: 'small' }}/></span>
                    : <span className={style.icon}><BookmarkBorderIcon style={{ color: '#FFFFFF' }}/></span>)
                : <span className={style.iconEmpty}/>}
        </span>
    </span>
</div>)
export default Card;
