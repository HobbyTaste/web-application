import React, {Component} from 'react';
import style from "./UserInfo.module.css";
import {AnimatedModalWindow} from "../../../../HOC/AnimatedModalWindow/AnimatedModalWindow";
import ChangeForm from "./ChangeUserInfoForm/ChangeUserInfoForm";

const UserInfo = (props) => {
    let Change = AnimatedModalWindow(ChangeForm);
    return (
        <div>
            <div className={style.name}>
                {props.name}
            </div>
            <div className={style.information}>
                <ul className={style.userInfo}>
                    <li>
                        Email: {props.email}
                    </li>
                </ul>
                <div className={style.buttonContainer}>
                    <Change />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;