import React, {Component} from 'react';
import style from './ProviderCabinet.module.css';

const ProviderCabinet = (props) => {
    return (<div className={style.background}>
        <div className={style.layout}>
            <div className={style.info}>
                <div className={style.imgContainer}>
                    <img src="https://www.partner.su/upload/iblock/e77/e77ae50002a3ed484c1c33787abab866.jpg" alt="" className={style.img}/>
                </div>
            </div>
            <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                <div className={style.hobbiesContainer}>
                    <button className={style.addHobbyButton}>
                        Добавить новое хобби</button>
                </div>
            </div>
        </div>
    </div>);
};

export default ProviderCabinet;