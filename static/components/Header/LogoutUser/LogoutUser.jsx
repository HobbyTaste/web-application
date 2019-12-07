import React from 'react';
import s from './../Header.module.css';
import UserCabinetButton from "./Buttons/UserCabinetButton";
import LogoutButton from "./Buttons/LogoutButton";
import {Link} from "react-router-dom";
import MainPageButton from "./Buttons/MainPageButton";

const LogoutUser = (props) => {

    return (<div className={s.buttonsContainer}>
            {
                props.inUserCabinet ?
                <Link to='/'>
                    <div onClick={props.setOutCabinet}>
                        <MainPageButton />
                    </div>
                </Link> :
                <Link to='/user_cabinet'>
                    <div onClick={props.setInCabinet}>
                        <UserCabinetButton/>
                    </div>
                </Link>
            }
            <Link to='/'><LogoutButton logout={props.logout}/></Link></div>
    );
};

export default LogoutUser;