import React, {Component} from 'react';
import s from './../../HeaderButtons.module.css';


const LogoutButton = (props) => {
    return ( <div> <button onClick={props.logout} className={s.headerButtons}>
            ВЫЙТИ
    </button> </div>
    );
};

export default LogoutButton;