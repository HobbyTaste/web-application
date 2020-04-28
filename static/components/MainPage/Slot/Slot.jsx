import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import style from './Slot.module.css';
import HalfRating from '../../Common/FeedbackStatistic';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Price from './Price/Price';
import Tag from './Tags/Tag';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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

const Slot = (props) => (<div className={style.slot}>
    <img className={style.slotPic} src={props.pic}/>
    <span className={style.slotDescription}>
        <div className={style.slotHeader}>
            <span className={`${style.name} ${style.colorBlackSlot}`}>{props.name}</span>
            <HalfRating isUserAuth = {props.isUserAuth}/>
        </div>
        <div className={`${style.metro} ${style.colorBlueSlot}`}>
            <LocationOnIcon style={{ color: '#034488', fontSize: 'small' }} /> {props.metro}
        </div>
        <div className={`${style.address} ${style.colorGraySlot}`}>{props.adress}</div>
    </span>
    <Tag isParking={props.isParking} isBeginner={props.isBeginner} isRent={props.isRent}/>
    <Price price={props.price} priceTime={props.priceTime} priceCurriculum={props.priceCurriculum}/>
    {props.isUserAuth
        ? (props.isProviderAuth ? <div className={style.icon}><MonetizationOnIcon/></div>
            : <div className={style.icon}><BookmarkBorderIcon/></div>)
        : <div className={style.iconEmpty}/>}
    <div className={style.icon}><MoreHorizIcon/></div>
</div>);

export default Slot;
