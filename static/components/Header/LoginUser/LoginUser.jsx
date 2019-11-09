import React, {Component} from 'react';
import s from './../Header.module.css';
import SignIn from "./Buttons/SignIn";
import SignUp from "./Buttons/SignUp";
import {Link} from "react-router-dom";

const LoginUser = (props) => {

    return ( <div className={s.buttonsContainer}>
            <Link to="/registration"><SignUp /></Link>
        <SignIn /></div>
    );
};

export default LoginUser;