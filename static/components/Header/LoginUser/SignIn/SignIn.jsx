import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../../../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../../../redux/reducers/auth-reducer";
import {CommonButton} from "../../../Common/CommonButton";
import style from "./SignIn.module.css";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"email"} placeholder={"Email *"} autoFocus={true} type={"email"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль *"} type={"password"} /></div>

                <CommonButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</CommonButton>

        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    };

    return(
        <div>
            <h1 className={style.label}>Вход</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {login})(Login);