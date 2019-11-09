import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';


const UserCabinetButton = (props) => {
    return ( <div> <button className={s.headerButtons}>ЛИЧНЫЙ КАБИНЕТ</button> </div>
    );
};

export default UserCabinetButton;