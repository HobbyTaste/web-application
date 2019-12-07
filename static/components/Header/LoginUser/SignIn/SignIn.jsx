import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input, Password} from "../../../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../../../redux/reducers/auth-reducer";
import style from "./SignIn.module.css";
import {RedButton} from "../../../Common/MaterialsButtons";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"email"} placeholder={"Email *"} autoFocus={true} type={"email"} fieldName={"Email"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль *"} type="password" fieldName="Пароль"/></div>
             <RedButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</RedButton>

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