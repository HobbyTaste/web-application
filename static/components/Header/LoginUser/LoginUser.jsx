import React, {Component} from 'react';
import s from './../Header.module.css';
import {withModalWindow} from "../../../HOC/ModalWindow/ModalWindow";
import Login from "./SignIn/SignIn";
import Registration from "../../Registration/Registration";

const LoginUser = (props) => {
    let SignIn = withModalWindow(Login);
    let SignUp = withModalWindow(Registration);
    return (<div className={s.buttonsContainer}>
            <SignUp buttonName={"РЕГИСТРАЦИЯ"}/>
            <SignIn buttonName={"ВОЙТИ"}/>
        </div>
    );
};

export default LoginUser;