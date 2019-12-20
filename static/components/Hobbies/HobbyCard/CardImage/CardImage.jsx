import React, {Component} from 'react';
import style from "./CardImage.module.css";

const CardImage = (props) => {
    return (
        <div className={style.imgWrapper}>
            <div className={style.imgContainer}>
                <div className={style.img}
                     style={{
                         backgroundImage: 'url(' + `${props.cardImg}` + ')'
                     }}>
                </div>
            </div>
        </div>
    );
};

export default CardImage;