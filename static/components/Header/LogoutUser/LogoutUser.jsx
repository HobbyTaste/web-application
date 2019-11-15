import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import LogoutButton from "./Buttons/LogoutButton";
import {Link} from "react-router-dom";

const LogoutUser = (props) => {

    return ( <div className={s.buttonsContainer}>
    <Link to='/user_cabinet'><UserCabinetButton/></Link>
        <Link to='/'><LogoutButton logout={props.logout}/></Link></div>
    );
};

export default LogoutUser;