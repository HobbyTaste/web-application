import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
import style from "./ProviderRegistration.module.css";
import {GreenButton} from "../Common/MaterialsButtons";


const ProviderRegistrationForm = ({handleSubmit, error, ...custom}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div><Field component={Input} name={"organization"} placeholder={"Название организации *"}
                        autoFocus={true} fieldName={"Название организации"}/></div>
            <div><Field component={Input} name={"telephone"} placeholder={"Контактный телефон *"} type={"telephone"}
                        fieldName={"Контактный телефон"}/>
            </div>
            <div><Field component={Input} name={"email"} placeholder={"Почта *"} type={"email"} fieldName={"Почта"}/></div>
            <div><Field component={Input} name={"site"} placeholder={"Сайт *"} fieldName={"Сайт"}/></div>
            <div><Field component={Input} name={"info"} placeholder={"Информация о вас *"} fieldName={"Информация о вас"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль для входа в личный кабинет *"}
                        type={"password"} fieldName={"Пароль для входа в личный кабинет"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Повторите пароль *"} type={"password"}
                        fieldName={"Повторите пароль"}/></div>
            <GreenButton text={"ЗАРЕГИСТРИРОВАТЬСЯ"} label="Submit" onSubmit={handleSubmit} onClick={custom.handleClose}>ВОЙТИ</GreenButton>
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
            <div>
            <h1 className={style.formTitle}>Заполните небольшую форму регистрации и укажите информацию о себе</h1>
            <RegistrationReduxForm onSubmit={onSubmit} handeClose={props.handleClose}/>
            </div>
        </div>
    );
};
