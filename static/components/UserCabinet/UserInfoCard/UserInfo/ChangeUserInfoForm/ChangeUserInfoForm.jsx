import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../../../../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import style from "./ChangeUserInfoForm.module.css";
import {RedButton} from "../../../../Common/MaterialsButtons";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import User from '../../../../../api/User';


const userApi = new User();

const ChangeUserInfoForm = ({handleSubmit, error}) => {
    const uploadImage = (e) => {
        const file = e.target.files[0];
        const data = {
            name: 'Nikita',
            avatar: file
        };
        userApi.edit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"name"} placeholder={"Новое имя"} autoFocus={true} type={"text"} fieldName={"Новое имя"}/></div>
            <div><Field component={Input} name={"email"} placeholder={"Новый email"} type={"email"} fieldName={"Новый email"}/></div>
            <div><Field component={Input} name={"old_password"} placeholder={"Старый пароль"} type={"password"} fieldName={"Старый пароль"}/></div>
            <div><Field component={Input} name={"new_password"} placeholder={"Новый пароль"} type={"password"} fieldName={"Новый пароль"}/></div>
            <div className={style.uploadContainer}>
                <label htmlFor="file">
                    <CloudUploadIcon className={style.upload} style={{ fontSize: 80 }} />
                </label>
                <input type="file" name="file" id="file" onChange={uploadImage} className={style.input}/>
                <div>Загрузить фото</div>
            </div>
            <div className={style.saveButton}>
                <RedButton text={"СОХРАНИТЬ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</RedButton>
            </div>
            </form>
    );
};

const ChangeReduxForm = reduxForm({ form: 'change' })(ChangeUserInfoForm);

const ChangeForm = (props) => {
    const onSubmit = (formData) => {
        /*props.login(formData.email, formData.password);*/
    };
    return(
        <div>
            <h1 className={style.label}>Настройка профиля</h1>
            <ChangeReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default ChangeForm;
