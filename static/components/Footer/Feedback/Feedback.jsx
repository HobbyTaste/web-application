import React, {Component} from 'react';
import s from './Feedback.module.css';
import Info from './Info';
import Button from './Button';
import {Link} from 'react-router-dom';
import {GreenButton, RedLongButton} from "../../Common/MaterialsButtons";


const Feedback = (props) => {
    return (<div className={s.feedback}>
            <Info/>
            <Link to='/hobbies'>
            <RedLongButton text="Оставить отзыв"/>
            </Link>
        </div>
    );
};

export default Feedback;