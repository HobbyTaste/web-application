import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {CommonButton} from "../Common/CommonButton";
import style from "./ProviderRegistration.module.css";


const ProviderRegistrationForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div><Field component={Input} name={"organization"} placeholder={"Название организации *"}
                        autoFocus={true}/></div>
            <div><Field component={Input} name={"telephone"} placeholder={"Контактный телефон *"} type={"telephone"}/>
            </div>
            <div><Field component={Input} name={"email"} placeholder={"Почта *"} type={"email"}/></div>
            <div><Field component={Input} name={"site"} placeholder={"Сайт *"}/></div>
            <div><Field component={Input} name={"info"} placeholder={"Информация о вас *"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль для входа в личный кабинет *"}
                        type={"password"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Повторите пароль *"} type={"password"}/></div>
            <CommonButton text={"ЗАРЕГИСТРИРОВАТЬСЯ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</CommonButton>
        </form>
    );
};

const RegistrationReduxForm = reduxForm({form: 'providerRegistration'})(ProviderRegistrationForm);

export const ProviderRegistration = (props) => {

    const onSubmit = (formData) => {
        console.log("ok");
        /*props.login(formData.email, formData.password);*/
    };

    return (
        <div>
            <div className={style.header}>
                <div className={style.headerTitle}>Вход в личный кабинет партнера</div>
                <div className={style.signIn}>
                    <CommonButton text={"ВОЙТИ"}>ВОЙТИ</CommonButton>
                </div>
            </div>
            <div>
            <h1 className={style.formTitle}>Заполните небольшую форму регистрации и укажите информацию о себе</h1>
            <RegistrationReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

/*
export default connect(null, {login})(Login);*/
