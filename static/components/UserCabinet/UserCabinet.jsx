import React, {Component} from 'react';
import style from "./UserCabinet.module.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import UserHobbyCard from "./UserHobbyCard/UserHobbyCard";

const UserCabinet = (props) => {

    const myHobbies = props.myHobbyCards.map(c => <UserHobbyCard {...c} delete={props.deleteMyHobby}/>);

    return (<div>
        <div className={style.background}>
            <div className={style.layout}>
                <UserInfoCard name={props.name} email={props.email}/>
                <div className={style.hobbiesBlock}>
                    <div className={style.title}>Мои хобби</div>
                    {myHobbies}
                </div>
            </div>
        </div>
    </div>);
};

export default UserCabinet;