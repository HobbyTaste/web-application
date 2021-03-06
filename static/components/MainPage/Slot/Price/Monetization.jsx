import React, {Component} from 'react';

import style from './Monetization.module.css';
import Price from "./Price";
import { DayToString } from '../../../../utils/functions';


const Monetization = (props) => {
    let cells = style.oneCell;
    if ((props.Widget > 0 && props.Top > 0) || (props.Widget > 0 && props.Poster > 0) || (props.Top > 0 && props.Top > 0)) cells = style.twoCells;
    if (props.Widget > 0 && props.Top > 0 && props.Poster > 0) cells = style.threeCells;


    return (<span className={`${style.monetizationContainer} ${cells}`}>
        { (props.Widget > 0) && <Price price='Виджет' priceTime='осталось' priceCurriculum={props.Widget.toString() +' ' +DayToString(props.Widget)}/>}
        { (props.Top > 0) && <Price price='В топе поиска' priceTime='осталось' priceCurriculum={props.Top.toString() +' ' + DayToString(props.Top)}/>}
        { (props.Poster > 0) && <Price price='Афиша' priceTime='осталось' priceCurriculum={props.Poster.toString() +' ' + DayToString(props.Poster)}/>}
        { (props.Widget + props.Top + props.Poster === 0) && <span>
            <Price price='Нет' priceTime='монетизации'/>
        </span>}
    </span>);
};

export default Monetization;
