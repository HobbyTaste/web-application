import React, {Component} from 'react';
import style from "./UserCabinet.module.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";

const UserCabinet = (props) => {
    return (<div>
        <div className={style.background}>
            <div className={style.layout}>
                <UserInfoCard name={props.name} email={props.email}/>
                <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                </div>
            </div>
        </div>
    </div>);
};

export default UserCabinet;