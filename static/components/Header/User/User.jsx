import React, {Component} from 'react';
import s from './User.module.css';
import SignIn from "./Buttons/SignIn";
import SignUp from "./Buttons/SignUp";
import {Link} from "react-router-dom";

const User = (props) => {
    return ( <div className={s.userContainer}>
            <Link to="/login"><SignUp /></Link>
            <SignIn /> </div>
    );
};

export default User;