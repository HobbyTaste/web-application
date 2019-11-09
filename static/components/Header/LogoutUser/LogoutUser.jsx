import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import LogoutButton from "./Buttons/LogoutButton";

const LogoutUser = (props) => {

    return ( <div className={s.buttonsContainer}>
            <UserCabinetButton/>
            <LogoutButton logout={props.logout}/></div>
    );
};

export default LogoutUser;