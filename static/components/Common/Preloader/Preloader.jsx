import React from 'react';
import style from './Preloader.module.css';

let Preloader = (props) => {
    return (<div className={style.loader}>
        <div className={style.l_main}>
            <div className={style.l_square}><span></span><span></span><span></span></div>
            <div className={style.l_square}><span></span><span></span><span></span></div>
            <div className={style.l_square}><span></span><span></span><span></span></div>
            <div className={style.l_square}><span></span><span></span><span></span></div>
        </div>
    </div>);
};

export default Preloader;