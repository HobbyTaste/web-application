import React, {Component} from 'react';
import style from './Sidebar.css';
import Link from 'react-router-dom';
import advert from './advert1.png'

const Sidebar = (props) => {
    return (
        <div className={style.container}>
            <div className={style.advert}>
                <img className={style.image} src={advert}/>
            </div>
        </div>
    );
};

export default Sidebar;
