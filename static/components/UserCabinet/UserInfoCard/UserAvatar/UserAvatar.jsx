import React, {Component} from 'react';
import style from "./UserAvatar.module.css";

const UserAvatar = (props) => {
    return (
        <div className={style.imgWrapper}>
            <div className={style.imgContainer}>
                <div className={style.img}
                     style={{
                         backgroundImage: 'url("https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042492_01.jpg")'
                     }}>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;